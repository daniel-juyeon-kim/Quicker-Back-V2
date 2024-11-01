import { config } from "../config";
import { DeliveryUrlCreator, messageSender } from "../core";
import {
  completeDeliveryImageRepository,
  deliveryPersonMatchedDateRepository,
  failDeliveryImageRepository,
  locationRepository,
  orderRepository,
  receiverRepository,
  userRepository,
} from "../database";
import { AppDataSource } from "../loaders";
import { DeliveryUrlMessage } from "./order/delivery-url-message";
import { OrderLocationServiceImpl } from "./order/location/order-location.service.impl";
import { OrderCompleteImageService } from "./order/order-complete-image/order-complete-image.service";
import { OrderFailImageService } from "./order/order-fail-image/order-fail-image.service";
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

export const orderLocationService = new OrderLocationServiceImpl(locationRepository);
export const orderFailImageService = new OrderFailImageService(failDeliveryImageRepository);
export const orderCompleteImageService = new OrderCompleteImageService(completeDeliveryImageRepository);
