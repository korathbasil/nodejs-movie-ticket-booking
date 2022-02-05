const express = require("express");
// const passport = require("passport");

import { TheaterController } from "../controllers";

const router = express.Router();

// const verifyLogout = require("../middlewares/verify-theater-logout");
// const verifyLogin = require("../middlewares/verify-theater-login");
// const verifyTheater = require("../middlewares/verify-theater");
// const clearSession = require("../middlewares/clear-session");

// Login
router.get("/login", TheaterController.getLogin);
router.post("/login", TheaterController.postLogin);

// router.post(
//   "/login",
//   clearSession,
//   passport.authenticate("owner-local", {
//     successRedirect: "/theater",
//     failureRedirect: "/theater/login",
//     failureFlash: true,
//   })
// );
// // Logout
// router.get("/logout", verifyLogin, verifyTheater, theaterController.getLogout);
// // Dashboard
router.get("/", TheaterController.getHome);
// Screen Management
// router.get("/screen", TheaterController.getScreenManagement);
// // Add screen
// router.get(
//   "/screen/add-screen",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getAddScreen
// );

// router.post(
//   "/screen/add-screen",
//   verifyLogin,
//   verifyTheater,
//   theaterController.postAddScreen
// );
// // Screen Schedule
// router.get(
//   "/screen/schedule/:screenId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getScennSchedule
// );
// // Add Show
// router.get(
//   "/screen/schedule/:screenId/add-show",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getAddShow
// );
// router.post(
//   "/screen/schedule/:screenId/add-show",
//   verifyLogin,
//   verifyTheater,
//   theaterController.postAddShow
// );
// // Edit show

// // Delete show

// // Edit screen
// router.get(
//   "/screen/edit-screen/:screenId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getEditScreen
// );

// router.post(
//   "/screen/edit-screen/:screenId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.postEditScreen
// );
// // Delete Screen
// router.get(
//   "/screen/delete-screen/:screenId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getDeleteScreen
// );
// // Movie Mangement
// router.get("/movie", verifyLogin, verifyTheater, theaterController.getMovies);
// // Add Movie
// router.get(
//   "/movie/add-movie",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getAddMovie
// );
// router.post(
//   "/movie/add-movie",
//   verifyLogin,
//   verifyTheater,
//   theaterController.postAddMovie
// );
// // Edit Movie
// router.get(
//   "/movie/edit-movie/:movieId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getEditMovie
// );

// router.post(
//   "/movie/edit-movie/:movieId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.postEditMovie
// );
// // Delete Movie
// router.get(
//   "/movie/delete-movie/:movieId",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getDeleteMovie
// );
// // User Activity Tracker
// router.get(
//   "/user-activity",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getUserActivityTracker
// );
// // My Account
// router.get(
//   "/account",
//   verifyLogin,
//   verifyTheater,
//   theaterController.getAccount
// );

export { router as theaterRouter };
