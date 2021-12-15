import { Request, Response, NextFunction } from "express";
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.session.admin) {
    return res.redirect("/admin");
  }
  next();
};
