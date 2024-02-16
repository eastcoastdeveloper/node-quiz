let continueAsGuest = document.getElementById("continue-as-guest");

continueAsGuest.addEventListener("click", routeToQuiz);

function routeToQuiz() {
  window.location.assign("/guest/config");
}

let login = document.querySelector("#login");

// continueAsGuest.addEventListener("click", postLogin);

// function routeToQuiz() {
//   window.location.assign("/guest");
// }

// POST TOPIC & EMAIL
// async function postLogin(emailValue) {
//   console.log("fired");
//   await fetch(`http://localhost:8081/process-login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ message: "sent from login" }),
//     cache: "default",
//   }).then(() => {
//     window.location.assign("/welcome");
//   });
// }
