import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { UserTokens } from "../entities/UserTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens | null>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens | null>;
  deleteById(id: string): Promise<void>;
  deleteByUserId(user_id: string): Promise<void>;
}
export { IUsersTokensRepository };
