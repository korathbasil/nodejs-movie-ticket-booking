import { Request, Response, Router } from "express";
import { formValidator } from "helpers";

import { AdminService } from "../services";
// const passport = require("passport");

import { AdminController } from "../controllers";

const router = Router();

// // const verifyLogout = require("../middlewares/verify-admin-logout");
// const verifylogin = require("../middlewares/verify-admin-login");
// const verifyAdmin = require("../middlewares/verify-admin");
// // const clearSession = require("../middlewares/clear-session");

// // Signup
router.post("/signup", AdminController.postSignup);
// Login
router.get("/login", AdminController.getLogin);

router.post("/login", async (req: Request, res: Response) => {
  const admin = await AdminService.login({
    email: req.body.email!,
    password: req.body.password,
  });
  req.session.admin = { email: admin.email };

  if (!admin) return res.redirect("/admin/login");
  return res.redirect("/admin/");
});
// Logout
// router.get("/logout", verifylogin, verifyAdmin, AdminController.postLogout);

// Home
router.get("/", AdminController.getHome);

// // Theatres
router.get("/theater", AdminController.getAllTheaters);

// Users
router.get("/user", AdminController.getUserManagement);

// User Activity Tracker
router.get("/user-activity", AdminController.getUserManagement);

// // View All theaters of a selected owner
// router.get(
//   "/theater/view-theaters/:ownerId",
//   verifylogin,
//   verifyAdmin,
//   AdminController.getTheaters
// );

// Add theater owner
router.get("/theater/add-theater", AdminController.getAddTheater);

router.post(
  "/theater/add-theater",
  [formValidator.isEmail("email")],
  AdminController.postAddTheater
);

// // Edit theater owner
// router.get(
//   "/theater/edit-owner/:ownerId",
//   verifylogin,
//   verifyAdmin,
//   AdminController.getEditTheater
// );

// router.post(
//   "/theater/edit-owner/:ownerId",
//   verifyAdmin,
//   AdminController.getEditTheater
// );

// // Delete theater owner
// router.get(
//   "/theater/delete-owner/:ownerId",
//   verifylogin,
//   verifyAdmin,
//   AdminController.getDeleteTheater
// );
// User Mangement
router.get("/user", AdminController.getUserManagement);
// User Activity Tracker
router.get("/user-activity", AdminController.getUserManagement);

export { router as adminRouter };
