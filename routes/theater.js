const express = require("express");
const router = express.Router();

const theaterHelpers = require("../helpers/theater-helpers");

// Login
router.get("/login", (req, res) => {
  res.render("theater/login", {
    theaterRoute: true,
    title: "Login - Theater Owner - Cinemax",
  });
});
router.post("/login", (req, res) => {});
// Dashboard
router.get("/", (req, res) => {
  res.render("theater/dashboard", {
    theaterRoute: true,
    title: "Dashboard - Theater Owner - Cinemax",
    theaterOwner: true,
  });
});
// Screen Management
router.get("/screen", (req, res) => {
  res.render("theater/screen-management", {
    theaterRoute: true,
    title: "Screen Management - Theater Owner - Cinemax",
    theaterOwner: true,
  });
});
// Movie Mangement
router.get("/movie", (req, res) => {
  res.render("theater/movie-management", {
    theaterRoute: true,
    title: "Movie Management - Theater Owner - Cinemax",
    theaterOwner: true,
  });
});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("theater/user-activity", {
    theaterRoute: true,
    title: "User Activity Tracker - Theater Owner - Cinemax",
    theaterOwner: true,
  });
});
// My Account
router.get("/account", (req, res) => {
  res.render("theater/account", {
    theaterRoute: true,
    title: "My Account - Theater Owner - Cinemax",
    theaterOwner: true,
  });
});

module.exports = router;
