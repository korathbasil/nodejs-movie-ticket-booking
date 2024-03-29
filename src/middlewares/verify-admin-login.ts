import { Request, Response, NextFunction } from "express";
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};
