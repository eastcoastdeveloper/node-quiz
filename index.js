var express = require("express");
var app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

// ROUTE PATHS
const basePath = require("./routes/base-path");
const loginRoute = require("./routes/login");
const logout = require("./routes/logout");
const welcome = require("./routes/welcome");
const guest = require("./routes/guest");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(helmet());
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());
app.use(cookieParser());

// CHECK FOR PARAM THAT'S PRESENT ON ANY ROUTE ON INITIAL LOAD
// app.param("attempts", (req, res, next, attempts) => {
//   console.log("message param is present");
//   next();
// });

app.use((req, res, next) => {
  if (req.query.message === "fail") {
    res.locals.message = "Username or password are incorrect or do not exist. Please try again.";
  } else {
    res.locals.message = "";
  }
  next();
});

// SERVER
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at", host, port);
});

// ROUTER
app.use("/", basePath);
app.use("/login", loginRoute);
app.use("/logout", logout);
app.use("/welcome", welcome);
app.use("/guest", guest);

// USER LOGIN
// app.post("/process_login", (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   if (password != "") {
//     res.cookie("email", email);
//     res.redirect("/welcome");
//   } else {
//     res.redirect("/login/:attempt=1");
//   }
// });

// LOGOUT
// app.get("/logout", (req, res, next) => {
//   res.clearCookie("email");
//   res.redirect("/login");
// });
