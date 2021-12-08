import { Request, Response } from "express";

import userService from "../services/user.service";

export default {
  getSignup: (_: Request, res: Response) => {
    res.render("user/signup");
  },

  postSignup: (req: Request, res: Response) => {
    const otp = Math.floor(Math.random() * 1000000);
    req.body.otp = otp;
    userService.signup(req.body).then((id) => {
      userService.sendSignupOtp(otp, req.body.email, (e: any) => {
        if (e) {
          console.log(e);
        } else {
          res.render("user/verifySignupOTP", { userId: id });
        }
      });
    });
  },

  postSendOTP: (req: Request, res: Response) => {
    const userId = req.params.userId;
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
  },

  getLogin: (_: Request, res: Response) => {
    res.render("user/login");
  },

  postLogin: (req: Request, res: Response) => {
    const otp = Math.floor(Math.random() * 1000000);
    console.log(req.body);
    userService
      .login(req.body)
      .then((user: any) => {
        userService.updateLoginOtp(user._id, otp).then(() => {
          userService.sendLoginOtp(user.email, otp, (e: any) => {
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
  },

  postVerifyOTP: (req: Request, res: Response) => {
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
  },

  getLogout: (req: Request, res: Response) => {
    req.session.user = null;
    res.redirect("/");
  },

  getUserHome: (req: Request, res: Response) => {
    userService.getAllMovies().then((movies) => {
      res.render("user/home", {
        title: "Home - Cinemax",
        movies: movies,
        user: req.session.user,
        userRoute: true,
      });
    });
  },

  getMovie: (req: Request, res: Response) => {
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
  },

  getSeatselection: (req: Request, res: Response) => {
    const showId = req.params.showId;
    userService.getShowById(showId).then((show) => {
      res.render("user/show-seat-selection", {
        user: req.session.user,
        userRoute: true,
        show: show,
      });
    });
  },

  getPaymentPage: (req: Request, res: Response) => {
    res.render("user/payment", {
      user: req.session.user,
      userRoute: true,
    });
  },

  //   getrazorPayPage: (req: Request, res: Response) => {
  //     userService.generateOrderRazorpay().then((order) => {});
  //   },
};
