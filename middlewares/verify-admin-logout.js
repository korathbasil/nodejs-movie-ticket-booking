module.exports = (req, res, next) => {
  if (req.session.admin) {
    console.log("object")
    return res.redirect("/admin");
  }
  next();
};
