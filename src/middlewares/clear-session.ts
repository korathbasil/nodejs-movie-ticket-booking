import { Request, Response, NextFunction } from "express";

export default (req: Request, _: Response, next: NextFunction) => {
  // Clearing admin and theater data in session
  req.session.admin = null;
  req.session.theater = null;
  next();
};
