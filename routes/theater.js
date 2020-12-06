const express = require("express");
const router = express.Router();

const theaterHelpers = require("../helpers/theater-helpers");

// Login
router.get("/login", (req, res) => {
  res.render("theater/login", {
    theaterRoute: true,
    title: "Login - Theater - Cinemax",
  });
});
router.post("/login", (req, res) => {});
// Dashboard
router.get("/", (req, res) => {
  res.render("theater/dashboard", {
    theaterRoute: true,
    title: "Dashboard - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Screen Management
router.get("/screen", (req, res) => {
  res.render("theater/screen-management", {
    theaterRoute: true,
    title: "Screen Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Add screen
router.get("/screen/add-screen", (req, res) => {
  res.render("theater/add-screen", {
    theaterRoute: true,
    title: "Screen Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Edit screen
router.get("/screen/edit-screen", (req, res) => {
  res.render("theater/edit-screen", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Delete Screen
router.get("/theater/screen/delete-screen", (req, res) => {});
// Movie Mangement
router.get("/movie", (req, res) => {
  res.render("theater/movie-management", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Add Movie
router.get("/movie/add-movie", (req, res) => {
  res.render("theater/add-movie", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Edit Movie
router.get("/movie/edit-movie", (req, res) => {
  res.render("theater/edit-movie", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Delete Movie
router.get("/movie/edit-movie", (req, res) => {});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("theater/user-activity", {
    theaterRoute: true,
    title: "User Activity Tracker - Theater - Cinemax",
    theaterOwner: true,
  });
});
// My Account
router.get("/account", (req, res) => {
  res.render("theater/account", {
    theaterRoute: true,
    title: "My Account - Theater - Cinemax",
    theaterOwner: true,
  });
});

module.exports = router;
