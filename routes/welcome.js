const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/welcome", {
    email: req.cookies.email,
  });
});

module.exports = router;
