import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

import {
  chatService,
  deliveryPersonService,
  orderCompleteImageService,
  orderFailImageService,
  orderLocationService,
  orderService,
  senderReceiverService,
  userService,
} from "../service";
import { ErrorControllerImpl, ErrorMessageBotErrorHandler, SmsApiErrorHandler, TmapApiErrorHandler } from "./error";
import { DataBaseErrorController } from "./error/database/database-error.controller";
import { ExternalApiErrorController } from "./error/external-api/external-api-error.controller";
import { UnknownErrorController } from "./error/unknown/unknown-error.controller";

import { ErrorLogger } from "../core";
import { errorMessageBot } from "../core/instance";
import { ChatController } from "./chat.controller";
import { OrderFailImageController } from "./order/fail-image/order-fail-image.controller";
import { OrderLocationController } from "./order/location/order-location.controller";
import { OrderCompleteImageController } from "./order/order-complete-image.controller";
import { OrderDeliveryPersonController } from "./order/order-delivery-person.controller";
import { OrderSenderReceiverController } from "./order/order-sender-receiver.controller";
import { OrderController } from "./order/order.controller";
import { UserController } from "./user.controller";

export const chatController = new ChatController(chatService);
export const userController = new UserController(userService);
export const orderController = new OrderController(orderService);
export const orderDeliveryPersonController = new OrderDeliveryPersonController(deliveryPersonService);
export const orderLocationController = new OrderLocationController(orderLocationService);
export const orderFailImageController = new OrderFailImageController(orderFailImageService);
export const orderCompeteImageController = new OrderCompleteImageController(orderCompleteImageService);
export const orderSenderReceiverController = new OrderSenderReceiverController(senderReceiverService);

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
