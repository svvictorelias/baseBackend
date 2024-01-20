import { IUpdatePasswordUser, IUserDTO } from "@modules/user/dto/IUserDTO";
import { User } from "../entities/user";

type IUpdateUser = {
  id: string;
  data: User;
};

interface IUserRepository {
  create(data: IUserDTO): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  updatePassword({ id, password }: IUpdatePasswordUser): Promise<void>;
  update({ data, id }: IUpdateUser): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
