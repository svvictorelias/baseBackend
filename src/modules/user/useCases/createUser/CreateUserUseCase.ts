import { hash } from "bcryptjs";
import { IUserDTO } from "@modules/user/dto/IUserDTO";
import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute(data: IUserDTO): Promise<void> {
    const alreadyExistsUser = await this.userRepository.findByEmail(data.email);
    if (alreadyExistsUser) throw new AppError("Email já cadastrado", 401);
    const passwordHash = await hash(data.senha, 8);
    data.senha = passwordHash;
    await this.userRepository.create(data);
  }
}

export { CreateUserUseCase };
