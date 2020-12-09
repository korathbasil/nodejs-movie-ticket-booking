module.exports = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    return res.redirect("/admin/login");
    // next();
  }
};
