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
  if (req.session.admin) {
    res.redirect("/admin");
  } else {
    adminHelpers
      .findAdmin()
      .then(() => {
        res.render("admin/login", {
          title: "Login - Admin - Cinemax",
          adminRoute: true,
          adminExists: true,
        }); // Admin exists, render login form. There would be only one admin
      })
      .catch(() => {
        res.render("admin/login", {
          title: "Login - Admin - CineMax",
          adminRoute: true,
          adminExists: false,
        }); // Admin doesn't exist, render signup form
      });
  }
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
  req.session.admin = false;
  res.redirect("/");
});
// Dashboard
router.get("/", verifylogin, (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// Theatre Mangement
router.get("/theater", verifylogin, (req, res) => {
  res.render("admin/theater-management", {
    title: "Theater Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// View All theaters of a selected owner
router.get("/theater/view-theaters", verifylogin, (req, res) => {
  res.render("admin/theaters", {
    title: "Theater Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// Add theater owner
router.get("/theater/add-owner", verifylogin, (req, res) => {
  res.render("admin/add-theater-owner", {
    title: "Theater Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
router.post("/theater/add-owner", (req, res) => {
  adminHelpers
    .addTheaterOwner(req.body)
    .then(() => res.redirect("/admin"))
    .catch(() => res.redirect("/admin/theater/add-owner"));
  res.redirect("/admin");
});
// User Mangement
router.get("/user", verifylogin, (req, res) => {
  res.render("admin/user-management", {
    title: "User Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// User Activity Tracker
router.get("/user-activity", verifylogin, (req, res) => {
  res.render("admin/user-activity", {
    title: "User Activity Tracker - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});

module.exports = router;
