import { Request, Response, Router } from "express";

import { AuthenticateUserController } from "@modules/sessions/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/sessions/useCases/refreshToken/RefreshTokenController";
import { ensureAuthenticated } from "@shared/middleware/isAuth";

class RefreshTokenControllex {
  handle(request: Request, response: Response): Response {
    return response.json("tt");
  }
}

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const refreshTokenControllerx = new RefreshTokenControllex();

authenticateRoutes.post("/session", authenticateUserController.handle);
authenticateRoutes.get(
  "/tt",
  ensureAuthenticated,
  refreshTokenControllerx.handle
);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
