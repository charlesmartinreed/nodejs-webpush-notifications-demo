const express = require("express"),
  webpush = require("web-push"),
  path = require("path");

const keys = require("./dev/keys.js");
const app = express(),
  port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());

// create a set of VAPID keys via bash - from project folder - ./node_modules/.bin/web-push generate-vapid-keys
// these keys identify who is sending the notification
const publicVapidKey = keys.VAPID_PUB;
const privateVapidKey = keys.VAPID_PRIV;

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

  // Send a 201 - resource created
  res.status(201).json({});

  // Optionally, create the payload
  const payload = JSON.stringify({ title: "Push Notification Test" });

  // Pass object into send notification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
