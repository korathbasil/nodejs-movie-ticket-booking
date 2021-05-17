module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated()) //Error found req.isAuthenticated() not working
    next();
  } else {
    console.log("fail")
    res.redirect("/admin/login");
  }
};
