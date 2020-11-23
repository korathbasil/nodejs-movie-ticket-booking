const express = require("express");
const router = express.Router();

const adminHelpers = require("../helpers/admin-helpers");
const verifylogin = require("../middlewares/verify-admin-login");

// Login
router.get("/login", (req, res) => {
  res.render("admin/login", { admin: true });
});
router.post("/login", (req, res) => {
  adminHelpers
    .login(req.body)
    .then(() => {
      req.session.admin = true;
      res.redirect("/admin");
    })
    .catch((e) => {
      res.redirect("/admin/login");
    });
});
// Dashboard
router.get("/", verifylogin, (req, res) => {
  res.render("admin/dashboard", { admin: true });
});
// Theatre Mangement
router.get("/theater", verifylogin, (req, res) => {
  res.render("admin/theater-management", { admin: true });
});
// User Mangement
router.get("/user", verifylogin, (req, res) => {
  res.render("admin/user-management", { admin: true });
});
// User Activity Tracker
router.get("/user-activity", verifylogin, (req, res) => {
  res.render("admin/user-activity", { admin: true });
});

module.exports = router;
