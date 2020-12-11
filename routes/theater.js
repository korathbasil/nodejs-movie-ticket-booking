const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminHelpers = require("../helpers/admin-helpers");

const theaterHelpers = require("../helpers/theater-helpers");
const verifyLogout = require("../middlewares/verify-theater-logout");
const verifyLogin = require("../middlewares/verify-theater-login");
const verifyTheater = require("../middlewares/verify-theater");
const clearSession = require("../middlewares/clear-session");

// Login
router.get("/login", verifyLogout, (req, res) => {
  res.render("theater/login", {
    theaterRoute: true,
    title: "Login - Theater - Cinemax",
  });
});
router.post(
  "/login",
  clearSession,
  passport.authenticate("owner-local", {
    successRedirect: "/theater",
    failureRedirect: "/theater/login",
    failureFlash: true,
  })
);
// Logout
router.get("/logout", verifyLogin, verifyTheater, (req, res) => {
  req.session.theater = null;
  req.session.destroy();
  req.logout();
  res.redirect("/theater/login");
});
// Dashboard
router.get("/", verifyLogin, verifyTheater, (req, res) => {
  res.render("theater/dashboard", {
    theaterRoute: true,
    title: "Dashboard - Theater - Cinemax",
    theater: req.session.theater,
  });
});
// Screen Management
router.get("/screen", verifyLogin, verifyTheater, (req, res) => {
  const ownerId = req.session.passport.user;
  theaterHelpers.getScreens(ownerId).then((screens) => {
    res.render("theater/screen-management", {
      theaterRoute: true,
      title: "Screen Management - Theater - Cinemax",
      theater: req.session.theater,
      screens: screens,
    });
  });
});
// Add screen
router.get("/screen/add-screen", verifyLogin, verifyTheater, (req, res) => {
  res.render("theater/add-screen", {
    theaterRoute: true,
    title: "Screen Management - Theater - Cinemax",
    theater: req.session.theater,
  });
});
router.post("/screen/add-screen", verifyLogin, verifyTheater, (req, res) => {
  const ownerId = req.session.passport.user;
  theaterHelpers
    .addScreen(req.body, ownerId)
    .then(() => res.redirect("/theater/screen"))
    .catch(() => res.redirect("/theater/screen/add-screen"));
});
// Edit screen
router.get(
  "/screen/edit-screen/:screenId",
  verifyLogin,
  verifyTheater,
  (req, res) => {
    const screenId = req.params.screenId;
    theaterHelpers.getScreenbyId(screenId).then((screen) => {
      res.render("theater/edit-screen", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
        screen: screen,
      });
    });
  }
);
// Delete Screen
router.get(
  "/theater/screen/delete-screen",
  verifyLogin,
  verifyTheater,
  (req, res) => {}
);
// Movie Mangement
router.get("/movie", verifyLogin, verifyTheater, (req, res) => {
  theaterHelpers
    .getMovies()
    .then((movies) => {
      res.render("theater/movie-management", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
        movies: movies,
      });
    })
    .catch(() => {
      res.render("theater/movie-management", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
      });
    });
});
// Add Movie
router.get("/movie/add-movie", verifyLogin, verifyTheater, (req, res) => {
  res.render("theater/add-movie", {
    theaterRoute: true,
    title: "Movie Management - Theater - Cinemax",
    theater: req.session.theater,
  });
});
router.post("/movie/add-movie", verifyLogin, verifyTheater, (req, res) => {
  theaterHelpers
    .addMovie(req.body)
    .then(() => res.redirect("/theater/movie"))
    .catch(() => res.redirect("/theater/movie/add-movie"));
});
// Edit Movie
router.get(
  "/movie/edit-movie/:movieId",
  verifyLogin,
  verifyTheater,
  (req, res) => {
    const movieId = req.params.movieId;
    theaterHelpers.getMovieById(movieId).then((movie) => {
      console.log(movie);
      res.render("theater/edit-movie", {
        theaterRoute: true,
        title: "Movie Management - Theater - Cinemax",
        theater: req.session.theater,
        movie: movie,
      });
    });
  }
);
router.post(
  "/movie/edit-movie/:movieId",
  verifyLogin,
  verifyTheater,
  (req, res) => {
    const movieId = req.params.movieId;
    theaterHelpers
      .editMovie(req.body, movieId)
      .then(() => res.redirect("/theater/movie"));
  }
);
// Delete Movie
router.get(
  "/movie/delete-movie/:movieId",
  verifyLogin,
  verifyTheater,
  (req, res) => {
    const movieId = req.params.movieId;
    theaterHelpers
      .deleteMovie(movieId)
      .then(() => res.redirect("/theater/movie"))
      .catch(() => res.redirect("/theater/movie"));
  }
);
// User Activity Tracker
router.get("/user-activity", verifyLogin, verifyTheater, (req, res) => {
  res.render("theater/user-activity", {
    theaterRoute: true,
    title: "User Activity Tracker - Theater - Cinemax",
    theater: req.session.theater,
  });
});
// My Account
router.get("/account", verifyLogin, verifyTheater, (req, res) => {
  res.render("theater/account", {
    theaterRoute: true,
    title: "My Account - Theater - Cinemax",
    theater: req.session.theater,
  });
});

module.exports = router;
