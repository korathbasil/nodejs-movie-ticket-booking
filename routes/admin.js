const express = require("express");
const router = express.Router();

// Login
router.get("/login", (req, res) => {
  res.render("admin/login", { admin: true });
});
// Dashboard
router.get("/", (req, res) => {
  res.render("admin/dashboard", { admin: true });
});
// Theatre Mangement
router.get("/theater", (req, res) => {
  res.render("admin/theater-management", { admin: true });
});
// User Mangement
router.get("/user", (req, res) => {
  res.render("admin/user-management", { admin: true });
});
// User Activity Tracker
router.get("/user-activity", (req, res) => {
  res.render("admin/user-activity", { admin: true });
});

module.exports = router;
