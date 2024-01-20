import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindMeByIdUseCase } from "./FindMeByIdUseCase";

class FindMeByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findMeById = container.resolve(FindMeByIdUseCase);

    const { id } = req.user;

    const findMe = await findMeById.execute(id);

    return res.status(200).send(findMe);
  }
}

export { FindMeByIdController };
