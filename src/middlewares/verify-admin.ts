import { Request, Response, NextFunction } from "express";
import { AdminService } from "../services";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (await AdminService.getADminById(req.session.passport.user)) {
    req.session.admin = await AdminService.getADminById(
      req.session.passport.user
    );
    next();
  } else {
    res.redirect("/admin/login");
  }
};
