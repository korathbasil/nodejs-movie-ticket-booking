import { Router } from "express";

import { AdminController } from "../controllers";

const router = Router();

// home page => GET /admin
router.get("", AdminController.getHome);

// owners page => GET /admin/owners
router.get("/owners", AdminController.getOwners);

// add owner page => /admin/owners/add
router.get("/owners/add", AdminController.getAddOwner);

// theaters page => GET /admin/theaters
router.get("/theaters", AdminController.getTheaters);

// users page => GEt /admin/users
router.get("/users", AdminController.getUsers);

// managers page => GET /admin/managers
router.get("/managers", AdminController.getManagers);

export { router as adminRouter };
