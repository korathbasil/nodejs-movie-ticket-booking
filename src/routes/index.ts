import { Router } from "express";

import { adminRouter } from "./admin";
import { theaterRouter } from "./theater";
import { userRouter } from "./user";

const router = Router();

// router.use("/", userRouter);
router.use("/admin", adminRouter);
router.use("/theater", theaterRouter);

export { router as appRouter, userRouter };
