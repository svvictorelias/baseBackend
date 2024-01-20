import { User } from "@modules/user/infra/entities/user";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../infra/repositories/IUserRepository";

@injectable()
class FindMeByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute(id: string): Promise<User> {
    const findMe = await this.userRepository.findById(id);

    if (!findMe) throw new AppError("Usuário não encontrado", 404);
    delete findMe.senha;

    return findMe;
  }
}

export { FindMeByIdUseCase };
