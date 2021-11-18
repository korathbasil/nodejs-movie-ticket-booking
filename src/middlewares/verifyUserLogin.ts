import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};
