module.exports = (req, res, next) => {
  if (req.session.theater) {
    return res.redirect("/theater");
  }
  next();
};
