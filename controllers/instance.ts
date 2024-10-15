import { userService } from "../service";
import { UserController } from "./user.controller";

export const userController = new UserController(userService);
