import { userRepository } from "../database";
import { UserServiceImpl } from "./user/user.service.impl";

export const userService = new UserServiceImpl(userRepository);
