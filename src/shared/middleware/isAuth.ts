import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersTokensRepository } from "@modules/sessions/infra/repositories/UsersTokensRepository";
import { authConfig } from "@shared/config/auth";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;
    // console.log(user_id);

    const user = userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user_id,
    };
    return next();
  } catch (error) {
    console.log(error?.message);
    if (error?.message === "jwt expired") {
      throw new AppError("token.invalid", 401);
    } else {
      throw new AppError("token.error", 401);
    }
  }
}
