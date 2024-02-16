let continueAsGuest = document.getElementById("continue-as-guest");
// let login = document.querySelector("#login");

continueAsGuest.addEventListener("click", routeToQuiz);
// login.addEventListener("click", postLogin);

// ROUTE TO QUIZ
function routeToQuiz() {
  window.location.assign("/guest/config");
}

// POST TOPIC & EMAIL
// CHECK FOR EMAIL FORMAT
// CHECK THAT EMAIL IS NOT EMPTY
// CHECK THAT PASSWORD IS NOT EMPTY
// CHECK THAT PASSWORD IS MORE THAN N NUMBER OF CHARACTERS
// CHECK THAT PASSWORD HAS UPPERCASE, LOWERCASE, AND SPECIAL CHARACTERS
// WRAP IN TRY CATCH
// CAPTURE & DISPLAY 500 ERROR
// async function postLogin(emailValue) {
//   console.log(emailValue);
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
