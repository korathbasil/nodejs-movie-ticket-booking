import { Router } from "express";

import { UserController } from "../controllers";

const router = Router();

router.get("/", UserController.getHome);

router.post("/login", UserController.postLogin);

router.post("/signup", UserController.postSignup);

router.get("/movie/:id", UserController.getMovie);
// Seat selection
router.get("/show/:showId", UserController.getSeatSelection);

router.get("/cinemas", (req, res) => {
  res.render("user/cinemas", { user: req.session.user, userRoute: true });
});

router.get("/addons", UserController.getAddons);

router.get("/payments", UserController.getPayments);

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

// router.get("/show/:showid/payment", userController.getPaymentPage);

// router.get("/pay/razorpay", (req, res) => {
// });
// Theaters page

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
