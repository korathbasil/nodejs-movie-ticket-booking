module.exports = (req, res, next) => {
  req.session.admin = null;
  req.session.theater = null;
  req.logout();
  next();
};
