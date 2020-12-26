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
    userHelpers.sendSignupOtp(otp, req.body.email, (e) => {
      if (e) {
        console.log(e);
      } else {
        res.render("user/verifySignupOTP", { userId: id });
      }
    });
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
    .catch((e) => {
      req.session.error = e;
      res.redirect("/signup");
    });
});
// Login
router.get("/login", (req, res) => {
  res.render("user/login");
});
router.post("/login", (req, res) => {
  const otp = Math.floor(Math.random() * 1000000);
  console.log(req.body);
  userHelpers
    .login(req.body)
    .then((user) => {
      userHelpers.updateLoginOtp(user._id, otp).then(() => {
        userHelpers.sendLoginOtp(user.email, otp, (e) => {
          if (e) {
            console.log(e);
          } else {
            res.render("user/verifyLoginOTP", { userId: user._id });
          }
        });
      });
    })
    .catch((e) => {
      console.log(e);
      req.session.error = e;
      res.redirect("/login");
    });
});
router.post("/login/verifyOTP/:userId", (req, res) => {
  const userId = req.params.userId;
  userHelpers
    .verifyLoginOtp(userId, req.body.otp)
    .then((user) => {
      req.session.user = user;
      res.redirect("/");
    })
    .catch((e) => {
      req.session.error = e;
      res.redirect(`/login`);
    });
});
// Logout
router.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("/");
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
