const express = require("express");
const router = express.Router();

// Admin home
router.get("/", (req, res) => {
  res.render("admin/admin-home", { admin: true });
});

module.exports = router;
