const express = require("express");

import { Router, Request, Response } from "express";
const router = Router();
const sharp = require("sharp");
const passport = require("passport");

const adminService = require("../services/adminService");
const verifyLogout = require("../middlewares/verify-admin-logout");
const verifylogin = require("../middlewares/verify-admin-login");
const verifyAdmin = require("../middlewares/verify-admin");
const clearSession = require("../middlewares/clear-session");

// Signup
router.post("/signup", (req: Request, res: Response) => {
  console.log(req.body);
  adminService
    .signup(req.body)
    .then(() => {
      req.session.admin = false;
      res.redirect("/admin/login");
    })
    .catch(() => {
      res.redirect("/admin/login");
    });
});
// Login
router.get("/login", verifyLogout, (req, res) => {
  var flash = req.flash("message");
  console.log(flash);
  adminService
    .findAdmin()
    .then(() => {
      // console.log(req.session.adminErrors);
      res.render("admin/login", {
        title: "Login - Admin - Cinemax",
        adminRoute: true,
        adminExists: true,
        errorMessage: req.session.errorMessage,
      }); // Admin exists, render login form. There would be only one admin
      req.session.errorMessage = null;
    })
    .catch(() => {
      res.render("admin/login", {
        title: "Login - Admin - CineMax",
        adminRoute: true,
        adminExists: false,
      }); // Admin doesn't exist, render signup form
    });
});
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
router.get("/logout", verifylogin, verifyAdmin, (req, res) => {
  req.session.admin = null;
  req.session.destroy();
  req.logout();
  res.redirect("/");
});
// Dashboard
router.get("/", verifylogin, verifyAdmin, (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// Theatre Mangement
router.get("/theater", verifylogin, verifyAdmin, (req, res) => {
  adminService.getAllTheterOwners().then((owners) => {
    res.render("admin/theater-management", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      owners: owners,
    });
  });
});
// View All theaters of a selected owner
router.get(
  "/theater/view-theaters/:ownerId",
  verifylogin,
  verifyAdmin,
  (req, res) => {
    const ownerId = req.params.ownerId;
    adminService.getTheaterOwner(ownerId).then((ownerDetails) => {
      res.render("admin/theaters", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        ownerDetails: ownerDetails,
      });
    });
  }
);
// Add theater owner
router.get("/theater/add-owner", verifylogin, verifyAdmin, (req, res) => {
  res.render("admin/add-theater-owner", {
    title: "Theater Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
router.post(
  "/theater/add-owner",
  verifylogin,
  verifyAdmin,
  async (req, res) => {
    const image = req.files.image;
    const fileExtension =
      image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
    const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
    const imagePath = "/images/owners/" + fileName; // Setting the public path
    req.body.image = imagePath;

    const username =
      req.body.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
    const password = Math.random().toString(36).substring(7); // Generating password

    adminService.sendAddTheaterOwnerMail(
      req.body.email,
      username,
      password,
      async (e) => {
        if (e) {
          res.redirect("/admin/theater/add-owner");
        } else {
          req.body.username = username;
          req.body.password = password;
          await sharp(req.files.image.data)
            .resize({ width: 360 })
            .toFile(`./public/images/owners/${fileName}`);
          adminService
            .addTheaterOwner(req.body)
            .then(() => res.redirect("/admin/theater"))
            .catch(() => res.redirect("/admin/theater/add-owner"));
        }
      }
    );
  }
);

// Edit theater owner
router.get(
  "/theater/edit-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  (req, res) => {
    const ownerId = req.params.ownerId;
    adminService.getTheaterOwner(ownerId).then((ownerDetails) => {
      res.render("admin/edit-theater-owner", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        ownerDetails: ownerDetails,
      });
    });
  }
);
router.post("/theater/edit-owner/:ownerId", verifyAdmin, (req, res) => {
  const ownerId = req.params.ownerId;
  // theaterHeplers.getOwnerById(ownerId)
  adminService
    .editTheaterOwner(req.body, ownerId)
    .then(() => {
      res.redirect("/admin/theater");
    })
    .catch(() => {
      res.redirect("/admin/theater");
    });
});
// Delete theater owner
router.get(
  "/theater/delete-owner/:ownerId",
  verifylogin,
  verifyAdmin,
  (req, res) => {
    const ownerId = req.params.ownerId;
    adminService
      .deleteTheaterOwner(ownerId)
      .then(() => res.redirect("/admin/theater"))
      .catch((e) => console.log(e));
  }
);
// User Mangement
router.get("/user", verifylogin, verifyAdmin, (req, res) => {
  res.render("admin/user-management", {
    title: "User Management - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});
// User Activity Tracker
router.get("/user-activity", verifylogin, verifyAdmin, (req, res) => {
  res.render("admin/user-activity", {
    title: "User Activity Tracker - Admin - CineMax",
    adminRoute: true,
    admin: req.session.admin,
  });
});

module.exports = router;
