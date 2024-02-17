// AVAILABLE TO TEMPLATES, NOT ROUTES
function createNotification(message) {
  const notificationWrapper = document.createElement("div");
  const txt = document.createElement("span");
  notificationWrapper.classList.add("notification-wrapper");
  txt.innerText = message;
  notificationWrapper.appendChild(txt);
  document.querySelector("main").appendChild(notificationWrapper);
  setTimeout(() => {
    notificationWrapper.classList.add("toggle-notification");
  });
  return notificationWrapper;
}

function validateEmail(email) {
  var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}

export { createNotification, validateEmail };
