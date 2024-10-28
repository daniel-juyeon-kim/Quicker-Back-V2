import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import { ErrorLogger, errorMessageBot } from "../core";
import { orderLocationService, orderService, userService } from "../service";
import { ErrorControllerImpl, ErrorMessageBotErrorHandler, SmsApiErrorHandler, TmapApiErrorHandler } from "./error";
import { DataBaseErrorController } from "./error/database/database-error.controller";
import { ExternalApiErrorController } from "./error/external-api/external-api-error.controller";
import { UnknownErrorController } from "./error/unknown/unknown-error.controller";
import { OrderLocationController } from "./order/location/order-location.controller";
import { OrderController } from "./order/order.controller";
import { UserController } from "./user.controller";

export const userController = new UserController(userService);
export const orderController = new OrderController(orderService);
export const orderLocationController = new OrderLocationController(orderLocationService);

const databaseErrorController = new DataBaseErrorController();

const unknownErrorLogger = new ErrorLogger({
  logger: winston.createLogger(),
  transportation: new DailyRotateFile({
    filename: "%DATE%.error.log",
    datePattern: "YYYY-MM-DD",
    dirname: "error-logs/unknown",
  }),
});
const unknownErrorController = new UnknownErrorController({ messageBot: errorMessageBot, logger: unknownErrorLogger });
const errorMessageBotErrorLogger = new ErrorLogger({
  logger: winston.createLogger(),
  transportation: new DailyRotateFile({
    filename: "%DATE%.error.log",
    datePattern: "YYYY-MM-DD",
    dirname: "error-logs/errorMessageBot",
  }),
});
const errorMessageBotErrorHandler = new ErrorMessageBotErrorHandler(errorMessageBotErrorLogger);
const smsApiErrorLogger = new ErrorLogger({
  logger: winston.createLogger(),
  transportation: new DailyRotateFile({
    filename: "%DATE%.error.log",
    datePattern: "YYYY-MM-DD",
    dirname: "error-logs/sms-api",
  }),
});
const smsApiErrorHandler = new SmsApiErrorHandler({ logger: smsApiErrorLogger, errorMessageBot: errorMessageBot });
const tmapApiErrorLogger = new ErrorLogger({
  logger: winston.createLogger(),
  transportation: new DailyRotateFile({
    filename: "%DATE%.error.log",
    datePattern: "YYYY-MM-DD",
    dirname: "error-logs/tmap-api",
  }),
});
const tmapApiErrorHandler = new TmapApiErrorHandler({ logger: tmapApiErrorLogger, errorMessageBot: errorMessageBot });

const externalApiErrorController = new ExternalApiErrorController({
  errorMessageBotErrorHandler,
  smsApiErrorHandler,
  tmapApiErrorHandler,
});
export const errorController = new ErrorControllerImpl({
  unknownErrorController,
  databaseErrorController,
  externalApiErrorController,
});
