import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/sessions/infra/repositories/IUsersTokensRepository";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    // avatar?: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorreto!");
    }
    if (!user.habilitado) {
      throw new AppError("Usuário desabilidado!");
    }

    const passwordMatch = await compare(password, user.senha as string);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorreto!");
    }

    const token = sign({ role: user.tipo }, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });
    const refresh_token_expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refesh_token_days
    );
    await this.usersTokensRepository.deleteByUserId(user.id);
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.tipo,
        // avatar: user.avatar,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}
export { AuthenticateUserUseCase };
