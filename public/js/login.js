import { createNotification, validateEmail } from "../modules/global-functions.js";

let continueAsGuest = document.getElementById("continue-as-guest");
let login = document.querySelector(".login-btn button");

continueAsGuest.addEventListener("click", routeToQuiz);
login.addEventListener("click", postLogin);

// ROUTE TO QUIZ
function routeToQuiz() {
  window.location.assign("/guest/config");
}

// POST TOPIC & EMAIL
async function postLogin() {
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#password").value;

  // NO PASSWORD
  if (password === "" || password.length < 8) {
    createNotification("Password must contain more than eight characters.");
  }

  // EMAIL IS NOT VALID
  if (!validateEmail(email)) {
    createNotification("Please enter a valid email.");
  }

  // VALIDATED EMAIL FORMAT & PASSWORD
  if (validateEmail(email) && password.length > 8) {
    window.location.assign("/welcome");
  }
}
