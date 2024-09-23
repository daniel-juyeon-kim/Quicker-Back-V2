import { AppDataSource } from "../connector/data-source";
import { UserRepository } from "./impl/user.repository";

export const userRepository = new UserRepository(AppDataSource);
