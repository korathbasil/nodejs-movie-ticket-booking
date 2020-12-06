const express = require("express");
const router = express.Router();

// Login
router.get("/login", (req, res) => {
  res.render("theater/login", { theaterRoute: true });
});
router.post("/login", (req, res) => {});
// Dashboard
router.get("/", (req, res) => {
  res.render("theater/dashboard", { theaterRoute: true });
});
// Movie Mangement
router.get("/movie", (req, res) => {
  res.render("theater/movie-management", { theaterRoute: true });
});
// Screens
router.get("/screen", (req, res) => {
  res.render("theater/screen-management", { theaterRoute: true });
});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("theater/user-activity", { theaterRoute: true });
});
// My Account
router.get("/account", (req, res) => {
  res.render("theater/account", { theaterRoute: true });
});

module.exports = router;
