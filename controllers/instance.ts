import { errorLogger, slackBot } from "../core";
import { orderService, userService } from "../service";
import { ErrorControllerImpl } from "./error";
import { DataBaseErrorController } from "./error/database/database-error.controller";
import { RouterErrorController } from "./error/router/router-error.controller";
import { UnknownErrorController } from "./error/unknown/unknown-error.controller";
import { ValidateErrorController } from "./error/validation/validate-error.controller";
import { OrderController } from "./order/order.controller";
import { UserController } from "./user.controller";

export const userController = new UserController(userService);
export const orderController = new OrderController(orderService);

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
