let continueAsGuest = document.getElementById("continue-as-guest");

continueAsGuest.addEventListener("click", routeToQuiz);

function routeToQuiz() {
  window.location.assign("/guest");
}
