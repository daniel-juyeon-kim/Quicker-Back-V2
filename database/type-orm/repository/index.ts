import { AppDataSource } from "../connector/data-source";
import { ImageRepository } from "./impl/image.repository";
import { UserRepository } from "./impl/user.repository";

export const userRepository = new UserRepository(AppDataSource);
export const imageRepository = new ImageRepository(AppDataSource);
