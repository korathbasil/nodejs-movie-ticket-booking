const theaterHelpers = require("../helpers/theater-helpers");

module.exports = async (req, res, next) => {
  if (await theaterHelpers.getOwnerById(req.session.passport.user)) {
    req.session.theater = await theaterHelpers.getOwnerById(
      req.session.passport.user
    );
    next();
  } else {
    res.redirect("/theater/login");
  }
};
