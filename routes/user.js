var express = require("express");
var router = express.Router();

// Home Page
router.get("/", function (req, res) {
  res.render("user/home");
});
router.get("/cinemas", (req, res) => {
  res.render("user/cinemas");
});
router.get("/account", (req, res) => {
  res.render("user/account");
});

module.exports = router;
