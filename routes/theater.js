const express = require("express");
const router = express.Router();
const passport = require("passport");

const theaterHelpers = require("../helpers/theater-helpers");
const verifyLogin = require("../middlewares/verify-theater-login");

// Login
router.get("/login", (req, res) => {
  if (req.session.theaterLogin) {
    res.redirect("/theater");
  } else {
    res.render("theater/login", {
      theaterRoute: true,
      title: "Login - Theater - Cinemax",
    });
  }
});
// router.post(
//   "/login",
//   passport.authenticate("owner-local", {
//     successRedirect: "/theater",
//     failureRedirect: "/theater/login",
//     failureFlash: true,
//   })
// );
router.post("/login", (req, res) => {
  theaterHelpers
    .login(req.body)
    .then(() => {
      req.session.theaterLogin = true;
      res.redirect("/theater");
    })
    .catch(() => res.redirect("/theater/login"));
});
// Logout
router.get("/logout", (req, res) => {
  req.session.theaterLogin = false;
  res.redirect("/theater/login");
});
// Dashboard
router.get("/", verifyLogin, (req, res) => {
  res.render("theater/dashboard", {
    theaterRoute: true,
    title: "Dashboard - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Screen Management
router.get("/screen", verifyLogin, (req, res) => {
  res.render("theater/screen-management", {
    theaterRoute: true,
    title: "Screen Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Add screen
router.get("/screen/add-screen", verifyLogin, (req, res) => {
  res.render("theater/add-screen", {
    theaterRoute: true,
    title: "Screen Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Edit screen
router.get("/screen/edit-screen", verifyLogin, (req, res) => {
  res.render("theater/edit-screen", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Delete Screen
router.get("/theater/screen/delete-screen", verifyLogin, (req, res) => {});
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
router.post("/movie/add-movie", (req, res) => {
  // theaterHelpers.addMovie(req.body);
  console.log(req.body);
});
// Edit Movie
router.get("/movie/edit-movie", verifyLogin, (req, res) => {
  res.render("theater/edit-movie", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theaterOwner: true,
  });
});
// Delete Movie
router.get("/movie/edit-movie", verifyLogin, (req, res) => {});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("theater/user-activity", {
    theaterRoute: true,
    title: "User Activity Tracker - Theater - Cinemax",
    theaterOwner: true,
  });
});
// My Account
router.get("/account", verifyLogin, (req, res) => {
  res.render("theater/account", {
    theaterRoute: true,
    title: "My Account - Theater - Cinemax",
    theaterOwner: true,
  });
});

module.exports = router;
