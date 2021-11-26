import { Request, Response, NextFunction } from "express";
const theaterHelpers = require("../helpers/theater-helpers");

export default async (req: Request, res: Response, next: NextFunction) => {
  if (await theaterHelpers.getOwnerById(req.session.passport.user)) {
    req.session.theater = await theaterHelpers.getOwnerById(
      req.session.passport.user
    );
    next();
  } else {
    res.redirect("/theater/login");
  }
};
