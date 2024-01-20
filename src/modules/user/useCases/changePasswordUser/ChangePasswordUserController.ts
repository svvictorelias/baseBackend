import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";

class ChangePasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, password } = request.body;
    const { token } = request.headers;
    console.log(token);
    if (!token || token !== process.env.TOKEN_CHANGE_PASSWORD) {
      throw new AppError("Token de validação não informado", 401);
    }

    const changePasswordUserUseCase = container.resolve(
      ChangePasswordUserUseCase
    );
    await changePasswordUserUseCase.execute({ id, password });
    return response.status(204).send();
  }
}

export { ChangePasswordUserController };
