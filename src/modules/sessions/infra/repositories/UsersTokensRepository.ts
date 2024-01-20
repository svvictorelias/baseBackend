import prisma from "@database/prismaClient";
import { ICreateUserTokenDTO } from "@modules/sessions/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/sessions/infra/repositories/IUsersTokensRepository";

import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = await prisma.users_tokens.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    });
    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | null> {
    const usersTokens = await prisma.users_tokens.findFirst({
      where: { user_id, refresh_token },
    });

    return usersTokens;
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    const userToken = await prisma.users_tokens.findFirst({
      where: { refresh_token },
    });
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    await prisma.users_tokens.delete({ where: { id } });
  }
  async deleteByUserId(user_id: string): Promise<void> {
    await prisma.users_tokens.deleteMany({ where: { user_id } });
  }
}
export { UsersTokensRepository };
