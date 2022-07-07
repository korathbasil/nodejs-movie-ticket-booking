import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { AdminService, TheaterService } from "../services";
import { fileHelper } from "../helpers";

export class AdminController {
  public static getOwners(_: Request, res: Response) {
    res.render("admin/owners", {
      title: "Thater Owners - Admin - Cinemax",
      adminRoute: true,
    });
  }

  public static async getLogin(req: Request, res: Response) {
    if (req.session.admin) return res.redirect("/admin/");

    const isAdminExists = await AdminService.isAdminAlraedyExists();

    if (isAdminExists) {
      return res.render("admin/login", {
        title: "Login - Admin - Cinemax",
        adminRoute: true,
        hideSidebar: true,
        errorMessage: req.session.errorMessage,
      }); // Admin exists
    }

    return res.redirect("/admin/signup"); // Admin does't exist
  }

  public static async getSignup(req: Request, res: Response) {
    if (req.session.admin) return res.redirect("/admin/");

    const isAdminExists = await AdminService.isAdminAlraedyExists();

    if (isAdminExists) return res.redirect("/admin/login");

    return res.render("admin/signup", {
      title: "Signup - Admin - CineMax",
      adminRoute: true,
      hideSidebar: true,
    });
  }

  public static async postSignup(req: Request, res: Response) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    await AdminService.signup({ name, email, password });

    res.redirect("/admin/login");
  }

  public static async getHome(req: Request, res: Response) {
    res.render("admin/home", {
      title: "Home - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static async getTheater(req: Request, res: Response) {
    const theaterId = req.params.theaterId;

    const theater = await TheaterService.getTheaterByID(theaterId);
    res.render("admin/theaters", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      theaterDetails: theater,
    });
  }

  public static async getAllTheaters(req: Request, res: Response) {
    TheaterService.getAllTheaters().then((theaters) => {
      res.render("admin/theater-management", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        theaters: theaters,
      });
    });
  }

  public static getAddTheater(req: Request, res: Response) {
    res.render("admin/add-theater", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static async postAddTheater(req: Request, res: Response) {
    fileHelper.uploadFile();
    const errors = validationResult(req);
    console.log(errors.array());

    const theaterData = {
      name: req.body.theaterName,
      email: req.body.email,
      phone: req.body.phone,

      city: req.body.addressCity,
      state: req.body.addressState,
      pincode: req.body.addressPin,

      ownerName: req.body.ownerName,
      ownerEmail: req.body.ownerEmail,
      ownerPhone: req.body.ownerPhone,
    };

    await TheaterService.addTheater(theaterData);
    res.redirect("/admin/theater");
  }

  public static async getEditTheater(req: Request, res: Response) {
    const theaterId = req.params.theaterId;
    const theaterDetails = await TheaterService.getTheaterByID(theaterId);

    res.render("admin/edit-theater-owner", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
      ownerDetails: theaterDetails,
    });
  }

  public static async posteditTheater(req: Request, res: Response) {
    const theaterId = req.params.theaterId;
    // theaterHeplers.getOwnerById(ownerId)
    TheaterService.editTheaterDetails(req.body, theaterId)
      .then(() => {
        res.redirect("/admin/theater");
      })
      .catch(() => {
        res.redirect("/admin/theater");
      });
  }

  public static getDeleteTheater(req: Request, res: Response) {
    const theaterId = req.params.theaterId;
    TheaterService.deleteTheater(theaterId)
      .then(() => res.redirect("/admin/theater"))
      .catch((e) => console.log(e));
  }

  public static getUserManagement(req: Request, res: Response) {
    res.render("admin/user-management", {
      title: "User Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static getActivityTracker(req: Request, res: Response) {
    res.render("admin/user-activity", {
      title: "User Activity Tracker - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static postLogout(req: Request, res: Response) {
    req.session.admin = null;
    req.session.destroy();
    req.logout();
    res.redirect("/");
  }
}
