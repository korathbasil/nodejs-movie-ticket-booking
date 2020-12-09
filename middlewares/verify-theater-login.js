module.exports = (req, res, next) => {
  if (req.session.theaterLogin) {
    next();
  } else {
    // res.redirect("/theater/login");
    next();
  }
};
