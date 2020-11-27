const express = require("express");
const router = express.Router();

const adminHelpers = require("../helpers/admin-helpers");
const verifylogin = require("../middlewares/verify-admin-login");

// Authentication
router.post("/signup", (req, res) => {
  adminHelpers
    .signup(req.body)
    .then(() => {
      req.session.admin = true;
      res.redirect("/admin");
    })
    .catch(() => {
      req.redirect("/admin/login");
    });
});
router.get("/login", (req, res) => {
  adminHelpers
    .findAdmin()
    .then(() => {
      res.render("admin/login", { adminRoute: true, adminExists: true });
    })
    .catch(() => {
      res.render("admin/login", { adminRoute: true, adminExists: false });
    });
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
router.get("/logout", (req, res) => {
  // req.session.destroy();
  req.session.admin = false;
  res.redirect("/");
});
// Dashboard
router.get("/", verifylogin, (req, res) => {
  res.render("admin/dashboard", { adminRoute: true, admin: req.session.admin });
});
// Theatre Mangement
router.get("/theater", verifylogin, (req, res) => {
  res.render("admin/theater-management", {
    adminRoute: true,
    admin: req.session.admin,
  });
});
// User Mangement
router.get("/user", verifylogin, (req, res) => {
  res.render("admin/user-management", {
    adminRoute: true,
    admin: req.session.admin,
  });
});
// User Activity Tracker
router.get("/user-activity", verifylogin, (req, res) => {
  res.render("admin/user-activity", {
    adminRoute: true,
    admin: req.session.admin,
  });
});

module.exports = router;
