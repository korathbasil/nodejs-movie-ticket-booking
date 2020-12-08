const express = require("express");
const router = express.Router();
const sharp = require("sharp");

const adminHelpers = require("../helpers/admin-helpers");
const verifylogin = require("../middlewares/verify-admin-login");

// Authentication
router.post("/signup", (req, res) => {
  console.log(req.body);
  adminHelpers
    .signup(req.body)
    .then(() => {
      req.session.admin = true;
      res.redirect("/admin");
    })
    .catch(() => {
      res.redirect("/admin/login");
    });
});
router.get("/login", (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin");
  } else {
    adminHelpers
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
      req.session.errorMessage = e.message;
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
  adminHelpers.getAllTheterOwners().then((owners) => {
    res.render("admin/theater-management", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      owners: owners,
    });
  });
});
// View All theaters of a selected owner
router.get("/theater/view-theaters/:ownerId", verifylogin, (req, res) => {
  const ownerId = req.params.ownerId;
  adminHelpers.getTheaterOwner(ownerId).then((ownerDetails) => {
    res.render("admin/theaters", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      ownerDetails: ownerDetails,
    });
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
router.post("/theater/add-owner", verifylogin, async (req, res) => {
  const image = req.files.image;
  const fileExtension = image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
  const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
  const imagePath = "/images/owners/" + fileName; // Setting the public path
  req.body.image = imagePath;
  const username =
    req.body.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
  const password = Math.random().toString(36).substring(7); // Generating password
  adminHelpers.sendAddTheaterOwnerMail(
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
        adminHelpers
          .addTheaterOwner(req.body)
          .then(() => res.redirect("/admin/theater"))
          .catch(() => res.redirect("/admin/theater/add-owner"));
      }
    }
  );
});

// Edit theater owner
router.get("/theater/edit-owner/:ownerId", verifylogin, (req, res) => {
  const ownerId = req.params.ownerId;
  adminHelpers.getTheaterOwner(ownerId).then((ownerDetails) => {
    res.render("admin/edit-theater-owner", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      ownerDetails: ownerDetails,
    });
  });
});
router.post("/theater/edit-owner/:ownerId", (req, res) => {
  const ownerId = req.params.ownerId;
  adminHelpers
    .editTheaterOwner(req.body, ownerId)
    .then(() => {
      res.redirect("/admin/theater");
    })
    .catch(() => {
      res.redirect("/admin/theater");
    });
});
// Delete theater owner
router.get("/theater/delete-owner/:ownerId", verifylogin, (req, res) => {
  const ownerId = req.params.ownerId;
  adminHelpers
    .deleteTheaterOwner(ownerId)
    .then(() => res.redirect("/admin/theater"))
    .catch((e) => console.log(e));
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
