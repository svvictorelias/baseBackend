import { Router } from "express";
import { userRouter } from "./user.routes";
import { authenticateRoutes } from "./authenticate.routes";

const router = Router();
router.use("/user", userRouter);
router.use("/auth", authenticateRoutes);
export { router };
