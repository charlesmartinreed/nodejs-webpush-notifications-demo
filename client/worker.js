console.log("Service worker loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push was successfully received");
  // title is passed from the payload as established in index.js
  self.registration.showNotification(data.title, {
    body: "This is a notifcation from a Demo Appliation",
    icon: "https://image.ibb.co/frYOFd/tmlogo.png"
  });
});
