import { Request, Response } from "express";

import { AdminService, TheaterService } from "../services";

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

  public static async getTheaters(req: Request, res: Response) {
    TheaterService.getAllTheaters().then((theaters) => {
      res.render("admin/theater-management", {
        title: "Theater Management - Admin - CineMax",
        adminRoute: true,
        admin: req.session.admin,
        owners: theaters,
      });
    });
  }

  public static getAddTheater(req: Request, res: Response) {
    res.render("admin/add-theater-owner", {
      title: "Theater Management - Admin - CineMax",
      adminRoute: true,
      admin: req.session.admin,
    });
  }

  public static async postAddTheater(req: Request, res: Response) {
    // const image = req.files.image;
    // const fileExtension =
    //   image.name.split(".")[image.name.split(".").length - 1]; // Getting file extension by splitting on extesion dot(.)
    // const fileName = new Date().toISOString() + "." + fileExtension; // Creating a new file name with new Date() and fileExtension
    // const imagePath = "/images/owners/" + fileName; // Setting the public path
    // req.body.image = imagePath;
    // const username =
    //   req.body.email.split("@")[0] + Math.floor(Math.random() * 10000 + 1); // Generating a username with email address
    // const password = Math.random().toString(36).substring(7); // Generating password
    // adminService.sendAddTheaterOwnerMail(
    //   req.body.email,
    //   username,
    //   password,
    //   async (e: any) => {
    //     if (e) {
    //       res.redirect("/admin/theater/add-owner");
    //     } else {
    //       req.body.username = username;
    //       req.body.password = password;
    //       await sharp(req.files.image.data)
    //         .resize({ width: 360 })
    //         .toFile(`./public/images/owners/${fileName}`);
    //       adminService
    //         .addTheaterOwner(req.body)
    //         .then(() => res.redirect("/admin/theater"))
    //         .catch(() => res.redirect("/admin/theater/add-owner"));
    //     }
    //   }
    // );

    await TheaterService.addTheater(req.body);
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
