import { AppError } from "@shared/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserByEmailUseCase } from "./FindUserByEmailUseCase";

class FindUserByEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;
    const { token } = request.headers;
    console.log(token);
    if (!token || token !== process.env.TOKEN_CHANGE_PASSWORD) {
      throw new AppError("Token de validação não informado", 401);
    }
    const findUserByEmailUseCase = container.resolve(FindUserByEmailUseCase);
    const user = await findUserByEmailUseCase.execute(email);

    return response.send(user);
  }
}
export { FindUserByEmailController };
