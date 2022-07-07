import { Router } from "express";

import { AdminController } from "../controllers";

const router = Router();

// home page => GET /admin
router.get("", AdminController.getHome);

// owners page => GET /admin/owners
router.get("/owners", AdminController.getOwners);

export { router as adminRouter };
