const express = require("express");
const webpush = require("web-push");
const path = require("path");

// import keys from "./dev/keys.js";

const app = express();
const port = process.env.PORT || 5000;

// Set STATIC path
app.use(express.static(path.join(__dirname, "client")));

// MIDDLEWARE
app.use(express.json());

// create a set of VAPID keys via bash - from project folder - ./node_modules/.bin/web-push generate-vapid-keys
// these keys identify who is sending the notification
const publicVapidKey =
  "BCRAG7kbb-mKNqFI_TrBwUK6qOhQIFpFY65e70g495vcnBKBMCzW2ctKqEXFx06qjVdlg4Xdoxu1nlzVrW1dq3o";
const privateVapidKey = "UI-k0sIqzjDUxDqhReO2JtUQm_-XXNQg7JoGGvcfQaU";

// takes in an email and the keys
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Setup the subscribe route - this is responsible for serving the notification to the service worker
app.post("/subscribe", (req, res) => {
  // get push subscription object that will be pushed to client
  const subscription = req.body;
  console.log(req.body);

  // Send a 201 - resource created
  res.status(201).json({});

  // Optionally, create the payload
  const payload = JSON.stringify({ title: "This is A Test!" });

  // Pass object into send notification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
