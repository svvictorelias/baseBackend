import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/sessions/infra/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";

interface IPayload {
  sub: string;
  email: string;
}
interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<IResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const user_id = sub;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorreto!");
    }
    if (!user.habilitado) {
      throw new AppError("Usuário desabilidado!");
    }
    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );
    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }
    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ role: user.tipo }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_token,
    });
    const new_token_refresh = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      auth.expires_refesh_token_days
    );

    const newToken = await this.usersTokensRepository.create({
      expires_date,
      refresh_token: new_token_refresh,
      user_id,
    });
    const resp = {
      token: refresh_token,
      refresh_token: newToken.refresh_token,
    };

    return resp;
  }
}

export { RefreshTokenUseCase };
