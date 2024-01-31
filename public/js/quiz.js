let totalQuestions;
const qTotal = document.getElementById("totalNumber");
const qWrapper = document.getElementById("questions");
const currentQ = document.getElementById("current-q");
const qIndex = document.getElementById("q-index");
const next = document.getElementById("next");
let selectedAnswer;
let topic = null;
let data = null;
let index = 0;

next.addEventListener("click", nextQuestion);

// CHANGE Q INDEX, ADD NEW QUESTIONS, & RECORD ANSWER
function nextQuestion() {
  index++;
  renderQuestions(data);
  recordAnswer();
  //   console.log(index);
  //     console.log(qTotal.innerText);
  if (index === qTotal.innerText - 1) {
    checkForLastQuestion();
  }
}

async function recordAnswer() {
  await fetch(`http://localhost:8081/recordAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic: topic, chosenAnswer: selectedAnswer, index: index - 1 }),
    cache: "default",
  });
}

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
  const selectedQuestions = Array.from(document.querySelectorAll(".selected-q"));
  for (var i = 0; i < selectedQuestions.length; i++) {
    selectedQuestions[i].classList.remove("selected-q");
  }
  e.currentTarget.classList.add("selected-q");
  selectedAnswer = e.currentTarget.dataset.question;
}

function beginQuiz() {
  fetch(`http://localhost:8081/beginQuiz`)
    .then((data) => {
      return data.json();
    })
    .then((arr) => {
      payload = arr;
      console.log(payload);
      qTotal.innerText = payload.totalQuestions;
      topic = payload.topic;
      document.getElementById("topic-name").innerText = `${topic} Knowledge Test`;
      renderQuestions(data);
    });
}

function checkForLastQuestion() {
  // console.log(next);
  next.innerText = "Finish";
}

beginQuiz();
