import { ChangePasswordUserController } from "@modules/user/useCases/changePasswordUser/ChangePasswordUserController";
import { CreateUserController } from "@modules/user/useCases/createUser/CreateUserController";
import { FindMeByIdController } from "@modules/user/useCases/findMeById/FindMeByIdController";
import { FindUserByEmailController } from "@modules/user/useCases/findUserByEmail/FindUserByEmailController";
import { ensureAuthenticated } from "@shared/middleware/isAuth";
import { Router } from "express";

const userRouter = Router();

const createUserController = new CreateUserController();
const changePasswordUserController = new ChangePasswordUserController();
const findUserByEmailController = new FindUserByEmailController();
const findMeByIdController = new FindMeByIdController();

userRouter.post("/", ensureAuthenticated, createUserController.handle);
userRouter.patch("/change-password", changePasswordUserController.handle);
userRouter.get("/find-by-email/:email", findUserByEmailController.handle);
userRouter.get("/me", ensureAuthenticated, findMeByIdController.handle);

export { userRouter };
