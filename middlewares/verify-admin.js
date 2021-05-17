const adminHelpers = require("../helpers/admin-helpers");

module.exports = async (req, res, next) => {
  if (await adminHelpers.getAdminById(req.session.passport.user)) {
    req.session.admin = await adminHelpers.getAdminById(
      req.session.passport.user
    );
    console.log(req.session.admin)
    next();
  } else {
    res.redirect("/admin/login");
  }
};
