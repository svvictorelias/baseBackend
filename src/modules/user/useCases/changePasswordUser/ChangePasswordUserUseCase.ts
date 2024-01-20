import { IUpdatePasswordUser } from "@modules/user/dto/IUserDTO";

import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class ChangePasswordUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ id, password }: IUpdatePasswordUser): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const newPassword = await hash(password, 8);
    await this.userRepository.updatePassword({ id, password: newPassword });
    return;
  }
}

export { ChangePasswordUserUseCase };
