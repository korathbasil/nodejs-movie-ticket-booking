import { Router } from "express";
const passport = require("passport");

import adminController from "../controllers/adminController";

const router = Router();

const verifyLogout = require("../middlewares/verify-admin-logout");
const verifylogin = require("../middlewares/verify-admin-login");
const verifyAdmin = require("../middlewares/verify-admin");
const clearSession = require("../middlewares/clear-session");

// Signup
router.post("/signup", adminController.postSignup);
// Login
router.get("/login", verifyLogout, adminController.getLogin);

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
router.get("/logout", verifylogin, verifyAdmin, adminController.getLogout);

// Dashboard
router.get("/", verifylogin, verifyAdmin, adminController.getDashboard);

// Theatre Mangement
router.get("/theater", verifylogin, verifyAdmin, adminController.getAddTheater);

// View All theaters of a selected owner
router.get(
  "/theater/view-theaters/:ownerId",
  verifylogin,
  verifyAdmin,
  adminController.getTheaters
);

// Add theater owner
router.get(
  "/theater/add-owner",
  verifylogin,
  verifyAdmin,
  adminController.getAddtheaterOwner
);

router.post(
  "/theater/add-owner",
  verifylogin,
  verifyAdmin,
  adminController.postAddtheaterOwner
);

// Edit theater owner
router.get(
  "/theater/edit-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  adminController.getEditTheaterOwner
);

router.post(
  "/theater/edit-owner/:ownerId",
  verifyAdmin,
  adminController.postEditTheaterOwner
);

// Delete theater owner
router.get(
  "/theater/delete-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  adminController.getDeleteTheaterOwner
);
// User Mangement
router.get(
  "/user",
  verifylogin,
  verifyAdmin,
  adminController.getUserManagement
);
// User Activity Tracker
router.get(
  "/user-activity",
  verifylogin,
  verifyAdmin,
  adminController.getUserActivityTracker
);

export default router;
