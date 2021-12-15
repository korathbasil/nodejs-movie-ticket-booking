import { Router } from "express";
const passport = require("passport");

import { AdminController } from "../controllers";

const router = Router();

const verifyLogout = require("../middlewares/verify-admin-logout");
const verifylogin = require("../middlewares/verify-admin-login");
const verifyAdmin = require("../middlewares/verify-admin");
const clearSession = require("../middlewares/clear-session");

// Signup
router.post("/signup", AdminController.postSignup);
// Login
router.get("/login", verifyLogout, AdminController.getLogin);

router.post(
  "/login",
  clearSession,
  passport.authenticate("admin-local", {
    successRedirect: "/admin",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);
// Logout
router.get("/logout", verifylogin, verifyAdmin, AdminController.postLogout);

// Dashboard
router.get("/", verifylogin, verifyAdmin, AdminController.getDashboard);

// Theatre Mangement
router.get("/theater", verifylogin, verifyAdmin, AdminController.getAddTheater);

// View All theaters of a selected owner
router.get(
  "/theater/view-theaters/:ownerId",
  verifylogin,
  verifyAdmin,
  AdminController.getTheaters
);

// Add theater owner
router.get(
  "/theater/add-owner",
  verifylogin,
  verifyAdmin,
  AdminController.getAddTheater
);

router.post(
  "/theater/add-owner",
  verifylogin,
  verifyAdmin,
  AdminController.postAddTheater
);

// Edit theater owner
router.get(
  "/theater/edit-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  AdminController.getEditTheater
);

router.post(
  "/theater/edit-owner/:ownerId",
  verifyAdmin,
  AdminController.getEditTheater
);

// Delete theater owner
router.get(
  "/theater/delete-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  AdminController.getDeleteTheater
);
// User Mangement
router.get(
  "/user",
  verifylogin,
  verifyAdmin,
  AdminController.getUserManagement
);
// User Activity Tracker
router.get(
  "/user-activity",
  verifylogin,
  verifyAdmin,
  AdminController.getUserManagement
);

export default router;
