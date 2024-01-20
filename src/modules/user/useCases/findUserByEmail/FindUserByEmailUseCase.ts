import { User } from "@modules/user/infra/entities/user";
import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class FindUserByEmailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute(email: string): Promise<User> {
    if (!email) {
      throw new AppError("Email não informado", 404);
    }
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }
    delete user.senha;
    return user;
  }
}

export { FindUserByEmailUseCase };
