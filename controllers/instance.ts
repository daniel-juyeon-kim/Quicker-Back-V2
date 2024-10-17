import { errorLogger, slackBot } from "../core";
import { userService } from "../service";
import { ErrorControllerImpl } from "./error";
import { DataBaseErrorController } from "./error/database/database-error.controller";
import { RouterErrorController } from "./error/router/router-error.controller";
import { UnknownErrorController } from "./error/unknown/unknown-error.controller";
import { ValidateErrorController } from "./error/validation/validae-error.controller";
import { UserController } from "./user.controller";

export const userController = new UserController(userService);

const unknownErrorController = new UnknownErrorController({ messageBot: slackBot, logger: errorLogger });
const validateErrorController = new ValidateErrorController();
const routerErrorController = new RouterErrorController();
const databaseErrorController = new DataBaseErrorController();
export const errorController = new ErrorControllerImpl({
  validateErrorController,
  unknownErrorController,
  routerErrorController,
  databaseErrorController,
});
