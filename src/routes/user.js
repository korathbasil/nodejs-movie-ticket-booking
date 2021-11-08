var express = require("express");
var router = express.Router();

const userService = require("../services/userService.js.js");
const verifyUserLogin = require("../middlewares/verifyUserLogin");

// Signup
router.get("/signup", verifyUserLogin, (req, res) => {
  res.render("user/signup");
});
router.post("/signup", (req, res) => {
  const otp = Math.floor(Math.random() * 1000000);
  req.body.otp = otp;
  userService.signup(req.body).then((id) => {
    userService.sendSignupOtp(otp, req.body.email, (e) => {
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
  userService
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
router.get("/login", verifyUserLogin, (req, res) => {
  res.render("user/login");
});
router.post("/login", (req, res) => {
  const otp = Math.floor(Math.random() * 1000000);
  console.log(req.body);
  userService
    .login(req.body)
    .then((user) => {
      userService.updateLoginOtp(user._id, otp).then(() => {
        userService.sendLoginOtp(user.email, otp, (e) => {
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
  userService
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
  userService.getAllMovies().then((movies) => {
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
  // userHelpers.getMovieShowsById(movieId).then((theaters) => {
  //   res.render("user/movie", {
  //     theaters: theaters,
  //     user: req.session.user,
  //     userRoute: true,
  //   });
  // });
  userService.getAllShows(movieId).then((shows) => {
    res.render("user/movie", {
      shows: shows,
      user: req.session.user,
      userRoute: true,
    });
  });
});
// Seat selection
router.get("/show/:showId", (req, res) => {
  const showId = req.params.showId;
  userService.getShowById(showId).then((show) => {
    res.render("user/show-seat-selection", {
      user: req.session.user,
      userRoute: true,
      show: show,
    });
  });
});
router.get("/show/:showid/payment", (req, res) => {
  res.render("user/payment", {
    user: req.session.user,
    userRoute: true,
  });
});
router.get('/pay/razorpay', (req, res) => {
  userService.generateOrderRazorpay()
  .then(order => {
    
  })
})
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
  userService.payRazorpay();
});

module.exports = router;
