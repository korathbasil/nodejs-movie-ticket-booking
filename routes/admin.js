const express = require("express");
const router = express.Router();

const adminHelpers = require("../helpers/admin-helpers");

// Login
router.get("/login", (req, res) => {
  res.render("admin/login", { admin: true });
});
router.post("/login", (req, res) => {
  adminHelpers
    .login(req.body)
    .then(() => {
      res.redirect("/admin");
    })
    .catch((e) => {
      res.redirect("/admin/login");
    });
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
