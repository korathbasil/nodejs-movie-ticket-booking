import { Request, Response } from "express";

import { UserService } from "../services";

// import userService from "../services/user.service";

export class UserController {
  public static getHome(req: Request, res: Response) {
    if (req.session.user) {
      return res.render("user/home", {
        user: req.session.user,
      });
    }

    res.render("user/home");
  }

  public static async postSignup(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // TODO: input validation

    try {
      const user = await UserService.signup({ name, email, password });
      // req.session.user = user;
      return res.status(201).json({ success: true, user });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  // API
  public static async postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    // TODO: input validation
    try {
      const user = await UserService.login({ email, password });
      req.session.user = user;
      return res.status(200).json({ success: true, user });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public static async getMovie(req: Request, res: Response) {
    // const movieId = req.params.id;

    res.render("user/movie", {
      theaters: [],
      user: req.session.user,
      userRoute: true,
    });
  }

  public static async getSeatSelection(req: Request, res: Response) {
    res.render("user/show-seat-selection", {
      user: req.session.user,
      userRoute: true,
    });
  }

  public static getAddons(_: Request, res: Response) {
    res.render("user/addons");
  }

  public static getPayments(_: Request, res: Response) {
    res.render("user/payments");
  }
}

// export default {
//   getSignup: (_: Request, res: Response) => {
//     res.render("user/signup");
//   },

//   postSignup: (req: Request, res: Response) => {
//     const otp = Math.floor(Math.random() * 1000000);
//     req.body.otp = otp;
//     userService.signup(req.body).then((id) => {
//       userService.sendSignupOtp(otp, req.body.email, (e: any) => {
//         if (e) {
//           console.log(e);
//         } else {
//           res.render("user/verifySignupOTP", { userId: id });
//         }
//       });
//     });
//   },

//   postSendOTP: (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     userService
//       .verifySignupOtp(userId, req.body.otp)
//       .then((user) => {
//         req.session.user = user;
//         res.redirect("/");
//       })
//       .catch((e) => {
//         req.session.error = e;
//         res.redirect("/signup");
//       });
//   },

//   getLogin: (_: Request, res: Response) => {
//     res.render("user/login");
//   },

//   postLogin: (req: Request, res: Response) => {
//     const otp = Math.floor(Math.random() * 1000000);
//     console.log(req.body);
//     userService
//       .login(req.body)
//       .then((user: any) => {
//         userService.updateLoginOtp(user._id, otp).then(() => {
//           userService.sendLoginOtp(user.email, otp, (e: any) => {
//             if (e) {
//               console.log(e);
//             } else {
//               res.render("user/verifyLoginOTP", { userId: user._id });
//             }
//           });
//         });
//       })
//       .catch((e) => {
//         console.log(e);
//         req.session.error = e;
//         res.redirect("/login");
//       });
//   },

//   postVerifyOTP: (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     userService
//       .verifyLoginOtp(userId, req.body.otp)
//       .then((user) => {
//         req.session.user = user;
//         res.redirect("/");
//       })
//       .catch((e) => {
//         req.session.error = e;
//         res.redirect(`/login`);
//       });
//   },

//   getLogout: (req: Request, res: Response) => {
//     req.session.user = null;
//     res.redirect("/");
//   },

//   getUserHome: (req: Request, res: Response) => {
//     userService.getAllMovies().then((movies) => {
//       res.render("user/home", {
//         title: "Home - Cinemax",
//         movies: movies,
//         user: req.session.user,
//         userRoute: true,
//       });
//     });
//   },

//   getMovie: (req: Request, res: Response) => {

//     userService.getAllShows(movieId).then((shows) => {
//       res.render("user/movie", {
//         shows: shows,
//         user: req.session.user,
//         userRoute: true,
//       });
//     });
//   },

//   getSeatselection: (req: Request, res: Response) => {
//     const showId = req.params.showId;
//     userService.getShowById(showId).then((show) => {
//       res.render("user/show-seat-selection", {
//         user: req.session.user,
//         userRoute: true,
//         show: show,
//       });
//     });
//   },

//   getPaymentPage: (req: Request, res: Response) => {
//     res.render("user/payment", {
//       user: req.session.user,
//       userRoute: true,
//     });
//   },

//   //   getrazorPayPage: (req: Request, res: Response) => {
//   //     userService.generateOrderRazorpay().then((order) => {});
//   //   },
// };
