import { Request, Response } from "express";
import sharp from "sharp";

import { AdminService } from "../services";

export class AdminController {
  public static async getLogin(req: Request, res: Response) {
    const isAdminExists = await AdminService.isAdminAlraedyExists();

    if (isAdminExists) {
      return res.render("admin/login", {
        title: "Login - Admin - Cinemax",
        adminRoute: true,
        adminExists: true,
        errorMessage: req.session.errorMessage,
      }); // Admin exists
    }

    return res.render("admin/login", {
      title: "Login - Admin - CineMax",
      adminRoute: true,
      adminExists: false,
    }); // Admin does't exist
  }

  public static async postSignup(req: Request, res: Response) {
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    await AdminService.signup({ name, email, password });

    res.redirect("/admin/login");
  }

  public static async getDashboard(req: Request, res: Response) {
    res.render("admin/dashboard", {
      title: "Dashboard - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static async getTheaters(req: Request, res: Response) {
    const ownerId = req.params.ownerId;
  }
}

export default {
  getLogout: (req: Request, res: Response) => {
    req.session.admin = null;
    req.session.destroy();
    req.logout();
    res.redirect("/");
  },

  getTheaters: (req: Request, res: Response) => {
    const ownerId = req.params.ownerId;
    adminService.getTheaterOwner(ownerId).then((ownerDetails) => {
      res.render("admin/theaters", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        ownerDetails: ownerDetails,
      });
    });
  },

  getAddTheater: (req: Request, res: Response) => {
    adminService.getAllTheterOwners().then((owners) => {
      res.render("admin/theater-management", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        owners: owners,
      });
    });
  },

  getAddtheaterOwner: (req: Request, res: Response) => {
    res.render("admin/add-theater-owner", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  },

  postAddtheaterOwner: async (req: Request, res: Response) => {
    const image = req.files.image;
    const fileExtension =
      image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
    const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
    const imagePath = "/images/owners/" + fileName; // Setting the public path
    req.body.image = imagePath;

    const username =
      req.body.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
    const password = Math.random().toString(36).substring(7); // Generating password

    adminService.sendAddTheaterOwnerMail(
      req.body.email,
      username,
      password,
      async (e: any) => {
        if (e) {
          res.redirect("/admin/theater/add-owner");
        } else {
          req.body.username = username;
          req.body.password = password;
          await sharp(req.files.image.data)
            .resize({ width: 360 })
            .toFile(`./public/images/owners/${fileName}`);
          adminService
            .addTheaterOwner(req.body)
            .then(() => res.redirect("/admin/theater"))
            .catch(() => res.redirect("/admin/theater/add-owner"));
        }
      }
    );
  },

  getEditTheaterOwner: (req: Request, res: Response) => {
    const ownerId = req.params.ownerId;
    adminService.getTheaterOwner(ownerId).then((ownerDetails) => {
      res.render("admin/edit-theater-owner", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        ownerDetails: ownerDetails,
      });
    });
  },

  postEditTheaterOwner: (req: Request, res: Response) => {
    const ownerId = req.params.ownerId;
    // theaterHeplers.getOwnerById(ownerId)
    adminService
      .editTheaterOwner(req.body, ownerId)
      .then(() => {
        res.redirect("/admin/theater");
      })
      .catch(() => {
        res.redirect("/admin/theater");
      });
  },

  getDeleteTheaterOwner: (req: Request, res: Response) => {
    const ownerId = req.params.ownerId;
    adminService
      .deleteTheaterOwner(ownerId)
      .then(() => res.redirect("/admin/theater"))
      .catch((e) => console.log(e));
  },

  getUserManagement: (req: Request, res: Response) => {
    res.render("admin/user-management", {
      title: "User Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  },

  getUserActivityTracker: (req: Request, res: Response) => {
    res.render("admin/user-activity", {
      title: "User Activity Tracker - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  },
};
