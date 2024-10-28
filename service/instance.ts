import { config } from "../config";
import { DeliveryUrlCreator, messageSender } from "../core";
import { deliveryPersonMatchedDateRepository, orderRepository, receiverRepository, userRepository } from "../database";
import { AppDataSource } from "../loaders";
import { DeliveryUrlMessage } from "./order/delivery-url-message";
import { OrderServiceImpl } from "./order/order.service.impl";
import { UserServiceImpl } from "./user/user.service.impl";

export const userService = new UserServiceImpl(userRepository);

const deliveryUrlCreator = new DeliveryUrlCreator({
  encryptKey: config.urlCryptoKey,
  baseUrl: config.clientServerDomain,
});

const deliveryUrlMessage = new DeliveryUrlMessage({
  smsApi: messageSender,
  urlCreator: deliveryUrlCreator,
});
export const orderService = new OrderServiceImpl({
  dataSource: AppDataSource,
  orderRepository,
  receiverRepository,
  deliveryUrlMessage,
  deliveryPersonMatchedDateRepository,
});
