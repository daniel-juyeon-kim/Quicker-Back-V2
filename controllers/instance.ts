import { errorLogger, slackBot } from "../core";
import { userService } from "../service";
import { ErrorControllerImpl } from "./error";
import { UserController } from "./user.controller";

export const userController = new UserController(userService);
export const errorController = new ErrorControllerImpl({ messageBot: slackBot, logger: errorLogger });
