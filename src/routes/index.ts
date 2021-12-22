import { Router } from "express";

import { adminRouter } from "./admin";
import { userRouter } from "./user";

const router = Router();

router.use("/admin", adminRouter);
router.use("/", userRouter);

export { router as appRouter };
