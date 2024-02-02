const qTotal = document.getElementById("totalNumber");
const qWrapper = document.getElementById("questions");
const currentQ = document.getElementById("current-q");
const qIndex = document.getElementById("q-index");
const next = document.getElementById("next");
let totalQuestions;
let lastQuestion = false;
let selectedAnswer = null;
let topic = null;
let data = null;
let index = 0;

next.addEventListener("click", nextQuestion);

// CHANGE Q INDEX, ADD NEW QUESTIONS, & RECORD ANSWER
function nextQuestion() {
  if (selectedAnswer) {
    selectedAnswer = null;
    if (!lastQuestion) {
      index++;
      renderQuestions(data);
    }
    recordAnswer();
    if (index === qTotal.innerText - 1) {
      checkForLastQuestion();
    }
    next.setAttribute("disabled", "");
    next.classList.add("standard-button-inactive");
  }
}

// RECORD ANSWERS
async function recordAnswer() {
  console.log(lastQuestion);
  try {
    await fetch(`http://localhost:8081/recordAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic, chosenAnswer: selectedAnswer, index: index - 1, lastQuestion: lastQuestion }),
      cache: "default",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data.message);
        data.message === "congrats" ? window.location.assign("/congrats") : console.log("keep going");
      });
  } catch (error) {
    console.log(error);
  }
}

// POPULATE QUESTIONS & ADD TO DOM
function renderQuestions(d) {
  qWrapper.innerText = "";
  qIndex.innerText = index + 1;
  d = payload.questions.challenges[index].answers;
  currentQ.innerText = payload.questions.challenges[index].question;
  for (var i = 0; i < d.length; i++) {
    const div = document.createElement("div");
    div.setAttribute("data-question", i);
    const span = document.createElement("span");
    span.innerText = `${d[i].item}`;
    div.appendChild(span);
    div.addEventListener("click", questionHandler);
    qWrapper.appendChild(div);
  }
  const wrapper = document.querySelector(".quiz-wrapper");
  wrapper.classList.remove("quiz-wrapper-fade");
}

// QUESTION CLICK HANDLER
function questionHandler(e) {
  next.removeAttribute("disabled");
  next.classList.remove("standard-button-inactive");
  const selectedQuestions = Array.from(document.querySelectorAll(".selected-q"));
  for (var i = 0; i < selectedQuestions.length; i++) {
    selectedQuestions[i].classList.remove("selected-q");
  }
  e.currentTarget.classList.add("selected-q");
  selectedAnswer = e.currentTarget.dataset.question;

  if (next.innerText === "Finish") {
    lastQuestion = true;
    console.log("last question!!");
  }
}

// BEGIN QUIZ
function beginQuiz() {
  fetch(`http://localhost:8081/beginQuiz`)
    .then((data) => {
      return data.json();
    })
    .then((arr) => {
      payload = arr;
      qTotal.innerText = payload.totalQuestions;
      topic = payload.topic;
      document.getElementById("topic-name").innerText = `${topic} Knowledge Test`;
      renderQuestions(data);
    });
}

function checkForLastQuestion() {
  next.innerText = "Finish";
}

beginQuiz();
