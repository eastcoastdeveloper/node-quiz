var express = require("express");
var app = express();
var fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
let payload = {};
let results = {};

app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

// SERVER
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at", host, port);
});

// HOME
app.get("/", function (req, res) {
  res.redirect("/welcome");
});

// WELCOME
app.get("/welcome", function (req, res) {
  res.render("pages/welcome");
});

// WELCOME
app.get("/guest", function (req, res) {
  res.render("pages/guest");
});

// QUIZ
app.get("/quiz", (req, res) => {
  if (Object.keys(payload).length === 0) {
    res.redirect("/");
  } else {
    res.render("pages/quiz");
  }
});

// RESULTS
app.get("/results", (req, res) => {
  res.render("pages/results");
});

// SEND DROPDOWN MENU ITEMS
app.get("/getMenuItems", function (req, res) {
  fs.readFile(__dirname + "/" + "questions.json", "utf8", function (err, data) {
    let arr = [];
    const d = JSON.parse(data);
    for (let key in d) {
      arr.push({ value: key });
    }
    res.send(JSON.stringify(arr));
  });
});

// ??
app.get("/beginQuiz", function (req, res) {
  res.send(payload);
});

// OBTAIN EMAIL & CREATE QUIZ PAYLOAD
app.post("/user", function (req, res) {
  const menuSelection = req.body.topic;
  fs.readFile(__dirname + "/" + "questions.json", "utf8", function (err, data) {
    // const email = req.body.email;
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
});

// RECORD ANSWER
app.post("/recordAnswer", function (req, res) {
  fs.readFile(__dirname + "/" + "questions.json", "utf8", function (err, data) {
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

        // Calculate Score
        if (totalNumber === Object.values(results).length) {
          let numCorrect = 0;
          for (let i = 0; i < Object.values(results).length; i++) {
            if (Object.values(results)[i].outcome === "correct") {
              numCorrect++;
            }
          }
          let score = `${Math.round((numCorrect / totalNumber) * 100)}%`;
          console.log(score);
        }
      }
    }

    res.send({ message: results });
  });
});
