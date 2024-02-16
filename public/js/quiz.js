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
    index++;
    if (!lastQuestion) {
      renderQuestions(data);
    }
    recordAnswer(lastQuestion);
    index === qTotal.innerText - 1 ? (next.innerText = "Finish") : "";

    next.setAttribute("disabled", "");
    next.classList.add("button-inactive");
    selectedAnswer = null;
  }
}

// RECORD ANSWERS
async function recordAnswer(finalQuestion) {
  try {
    await fetch(`http://localhost:8081/guest/recordAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic, chosenAnswer: selectedAnswer, index: index - 1, finalQuestion: finalQuestion }),
      cache: "default",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.message === "redirect") {
          window.location.assign("/guest/results");
        }
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
  // const wrapper = document.querySelector(".quiz-wrapper");
}

// QUESTION CLICK HANDLER
function questionHandler(e) {
  next.removeAttribute("disabled");
  next.classList.remove("button-inactive");
  const selectedQuestions = Array.from(document.querySelectorAll(".selected-q"));
  for (var i = 0; i < selectedQuestions.length; i++) {
    selectedQuestions[i].classList.remove("selected-q");
  }
  e.currentTarget.classList.add("selected-q");
  selectedAnswer = e.currentTarget.dataset.question;

  if (next.innerText === "Finish") {
    lastQuestion = true;
  }
}

// BEGIN QUIZ
function beginQuiz() {
  fetch(`http://localhost:8081/guest/beginQuiz`)
    .then((data) => {
      return data.json();
    })
    .then((arr) => {
      payload = arr;
      qTotal.innerText = payload.totalQuestions;
      topic = payload.topic;
      renderQuestions(data);
    });
}

beginQuiz();
