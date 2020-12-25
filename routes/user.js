var express = require("express");
var router = express.Router();

const userHelpers = require("../helpers/user-helpers");

// Signup
router.get("/signup", (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  const otp = Math.floor(Math.random() * 1000000);
  req.body.otp = otp;
  userHelpers.signup(req.body).then((id) => {
    res.render("user/verifyOTP", { userId: id });
  });
});
router.post("/signup/verifyOTP/:userId", (req, res) => {
  userId = req.params.userId;
  userHelpers
    .verifySignupOtp(userId, req.body.otp)
    .then((user) => {
      req.session.user = user;
      res.redirect("/");
    })
    .catch((e) => res.redirect("/signup"));
});
// Login
router.get("/login", (req, res) => {
  res.render("user/login");
});
// Home Page
router.get("/", function (req, res) {
  userHelpers.getAllMovies().then((movies) => {
    res.render("user/home", {
      title: "Home - Cinemax",
      movies: movies,
      user: req.session.user,
      userRoute: true,
    });
  });
});
// Movie page
router.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  userHelpers.getMovieById(movieId).then((movie) => {
    res.render("user/movie", {
      movie: movie,
      user: req.session.user,
      userRoute: true,
    });
  });
});
// Theaters page
router.get("/cinemas", (req, res) => {
  res.render("user/cinemas", { user: req.session.user, userRoute: true });
});
// Account page
router.get("/account", (req, res) => {
  res.render("user/account", { user: req.session.user, userRoute: true });
});

router.get("/test", (req, res) => {
  res.render("user/testPayment");
});
router.post("/pay/razorpay", (req, res) => {
  userHelpers.payRazorpay();
});

module.exports = router;
