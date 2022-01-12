import { Router, Request, Response } from "express";

// import userController from "../controllers/userController";
// const verifyUserLogin = require("../middlewares/verifyUserLogin");

import { UserController } from "../controllers";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.render("user/home");
});
router.get("/a", (_: Request, res: Response) => {
  res.render("user/home");
});

// Signup
// router.get("/signup", verifyUserLogin, userController.getSignup);

// router.post("/signup", userController.postSignup);

// router.post("/signup/verifyOTP/:userId", userController.postSendOTP);
// // Login
// router.get("/login", verifyUserLogin, userController.getLogin);

// router.post("/login", userController.postLogin);

// router.post("/login/verifyOTP/:userId", userController.postVerifyOTP);
// // Logout
// router.get("/logout", userController.getLogout);
// // Home Page
// router.get("/", userController.getUserHome);
// Movie page
router.get("/movie/:id", UserController.getMovie);
// Seat selection
router.get("/show/:showId", UserController.getSeatSelection);

// router.get("/show/:showid/payment", userController.getPaymentPage);

// router.get("/pay/razorpay", (req, res) => {
// });
// Theaters page
router.get("/cinemas", (req, res) => {
  res.render("user/cinemas", { user: req.session.user, userRoute: true });
});
// // Account page
// router.get("/account", (req, res) => {
//   res.render("user/account", { user: req.session.user, userRoute: true });
// });

// router.get("/test", (req, res) => {
//   res.render("user/testPayment");
// });
// router.post("/pay/razorpay", (req, res) => {
//   userService.payRazorpay();
// });

export { router as userRouter };
