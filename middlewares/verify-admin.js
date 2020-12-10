const adminHelpers = require("../helpers/admin-helpers");

module.exports = async (req, res, next) => {
  if (await adminHelpers.getAdminById(req.session.passport.user)) {
    req.session.admin = await adminHelpers.getAdminById(
      req.session.passport.user
    );
    next();
  } else {
    return res.redirect("/admin/login");
  }
};
