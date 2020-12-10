module.exports = (req, res, next) => {
  // Clearing admin and theater data in session
  req.session.admin = null;
  req.session.theater = null;
  next();
};
