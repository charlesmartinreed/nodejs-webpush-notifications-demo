// const keys = require("../dev/keys.js");
// import keys from "..dev/keys.js";

const publicVapidKey =
  "BCRAG7kbb-mKNqFI_TrBwUK6qOhQIFpFY65e70g495vcnBKBMCzW2ctKqEXFx06qjVdlg4Xdoxu1nlzVrW1dq3o";

// Check for the service worker support in current browser
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

// Register the service worker, register push, send the push notification
async function send() {
  // Register the service worker
  console.log("Registering service worker...");
  const register = await navigator.serviceWorker.register("/worker.js", {
    // define the scope for the service worker - ours works on the home page
    scope: "/"
  });
  console.log("Service worker Registered successfully");

  // Register push
  console.log("Registering Push...");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    // applicationServerKey: urlBase64ToUint8Array(keys.VAPID_PUB)
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log("Push Registered successfully");

  // send the push notification
  console.log("Sending Push Notification...");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push was sent successfully");
}

// helper function comes from webpush API documentation on github
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
