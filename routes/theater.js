const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("theater/dashboard", { theaterRoute: true });
});

module.exports = router;
