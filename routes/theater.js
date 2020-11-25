const express = require("express");
const router = express.Router();

// Dashboard
router.get("/", (req, res) => {
  res.render("theater/dashboard", { theaterRoute: true });
});
// Movie Mangement
router.get("/movie", (req, res) => {
  res.render("theater/movie-management", { theaterRoute: true });
});
// Screens
router.get("/screens", (req, res) => {
  res.render("theater/screens", { theaterRoute: true });
});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("theater/user-activity", { theaterRoute: true });
});

module.exports = router;
