const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

let payload = {};
let results = {};

router.get("/", (req, res, next) => {
  res.redirect("/guest/config");
});

// RENDER CONTENT
router.get("/config", function (req, res, next) {
  res.render("pages/guest");
});

router.post("/create-quiz", function (req, res) {
  const menuSelection = req.body.topic;
  const data = fs.readFileSync(path.resolve(__dirname, "../questions.json"));
  const results = JSON.parse(data);
  for (let x of Object.keys(results)) {
    if (x === menuSelection) {
      let totalQuestions = results[x][0].totalQuestions;
      let questions = results[x][1];
      payload.totalQuestions = totalQuestions;
      payload.questions = questions;
      payload.topic = menuSelection;
      res.end();
    }
  }
});

// RECORD ANSWERS
router.post("/recordAnswer", function (req, res) {
  const lastQuestion = req.body.finalQuestion;
  const data = fs.readFileSync(path.resolve(__dirname, "../questions.json"));

  const topic = req.body.topic;
  const questionIndex = parseInt(req.body.index);
  const chosenAnswer = parseInt(req.body.chosenAnswer) + 1;

  for (let x of Object.keys(JSON.parse(data))) {
    if (x === topic) {
      const correctAnswer = JSON.parse(data)[x][0].answers[questionIndex].correct;
      const totalNumber = JSON.parse(data)[x][0].totalQuestions;

      // results.topic = topic;
      results[questionIndex] = {
        correctAnswer: correctAnswer,
        chosenAnswer: chosenAnswer,
        outcome: correctAnswer === chosenAnswer ? "correct" : "incorrect",
      };

      if (lastQuestion) {
        calculateScore(results, totalNumber);
        res.send({ message: "redirect" });
      } else {
        res.send({ message: results });
      }
    }
  }
});

// CALCULATE SCORE
function calculateScore(results, totalNumber) {
  let numCorrect = 0;
  for (let i = 0; i < Object.values(results).length; i++) {
    if (Object.values(results)[i].outcome === "correct") {
      numCorrect++;
    }
  }
  let score = `${Math.round((numCorrect / totalNumber) * 100)}%`;
}

// POPULATE DROPDOWN MENU
router.get("/populateMenu", function (req, res) {
  const data = fs.readFileSync(path.resolve(__dirname, "../questions.json"));
  let arr = [];
  const d = JSON.parse(data);
  for (let key in d) {
    arr.push({ value: key });
  }
  res.send(JSON.stringify(arr));
});

// SEND THE PAYLOAD
router.get("/beginQuiz", function (req, res) {
  res.send(payload);
});

// RENDER THE QUIZ
router.get("/quiz", (req, res) => {
  if (Object.keys(payload).length === 0) {
    res.redirect("/");
  } else {
    res.render("pages/quiz");
  }
});

router.get("/results", (req, res) => {
  res.render("pages/results");
});

module.exports = router;
