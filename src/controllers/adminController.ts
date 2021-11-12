import { Request, Response } from "express";

import adminService from "../services/adminService";

export default {
  adminSignup: (req: Request, res: Response) => {
    adminService
      .signup(req.body)
      .then(() => {
        req.session.admin = false;
        res.redirect("/admin/login");
      })
      .catch(() => {
        res.redirect("/admin/login");
      });
  },
};
