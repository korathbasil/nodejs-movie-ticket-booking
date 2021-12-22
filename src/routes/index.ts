import { Router } from "express";

import { adminRouter } from "./admin";
import { theaterRouter } from "./theater";
import { userRouter } from "./user";

const router = Router();

router.use("/admin", adminRouter);
router.use("/theater", theaterRouter);
router.use("/", userRouter);

export { router as appRouter };
