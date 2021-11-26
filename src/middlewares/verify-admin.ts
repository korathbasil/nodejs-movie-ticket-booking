import { Request, Response, NextFunction } from "express";
const adminHelpers = require("../services/admin-helpers");

export default async (req: Request, res: Response, next: NextFunction) => {
  if (await adminHelpers.getAdminById(req.session.passport.user)) {
    req.session.admin = await adminHelpers.getAdminById(
      req.session.passport.user
    );
    next();
  } else {
    res.redirect("/admin/login");
  }
};
