const express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {
  res.render("pages/login");
});

module.exports = router;
