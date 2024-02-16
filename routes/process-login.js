const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (password != "") {
    res.cookie("email", email);
    res.redirect("/welcome");
  } else {
    console.log("REDIRECTED");
    res.redirect("/login");
  }
});

module.exports = router;
