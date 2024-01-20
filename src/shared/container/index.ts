import "@shared/container/providers";

import { IUserRepository } from "@modules/user/infra/repositories/IUserRepository";
import { UserRepository } from "@modules/user/infra/repositories/UserRepository";
import { container } from "tsyringe";
import { IUsersTokensRepository } from "@modules/sessions/infra/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/sessions/infra/repositories/UsersTokensRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
