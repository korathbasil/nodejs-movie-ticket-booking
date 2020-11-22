const express = require("express");
const router = express.Router();

// Admin home
router.get("/", (req, res) => {
  res.send("Iam admin");
});

module.exports = router;
