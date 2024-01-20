import { IUserDTO } from "@modules/user/dto/IUserDTO";
import { User } from "../entities/user";
import { IUserRepository } from "./IUserRepository";
import prisma from "@database/prismaClient";

class UserRepository implements IUserRepository {
  async create(data: IUserDTO): Promise<void> {
    await prisma.usuario.create({ data });
  }
  async findById(id: string): Promise<User> {
    const user = await prisma.usuario.findUnique({ where: { id } });
    return user as User;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.usuario.findFirst({ where: { email } });
    return user as User;
  }
  async update({ data, id }: { id: string; data: User }): Promise<void> {
    await prisma.usuario.update({ where: { id }, data });
    return;
  }
  async updatePassword({
    password,
    id,
  }: {
    id: string;
    password: string;
  }): Promise<void> {
    await prisma.usuario.update({
      where: { id },
      data: { senha: password },
    });
    return;
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { UserRepository };
