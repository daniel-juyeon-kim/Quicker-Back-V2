import { AppDataSource } from "../../loaders/data-source";
import { AverageOfCost, DeliveryPersonMatchedDate, Order, User } from "./entity";
import {
  AverageOfCostRepository,
  ChatRoomRepository,
  DeliveryPersonMatchedDateRepository,
  LocationRepository,
  ReceiverRepository,
} from "./repository";
import { UserRepositoryImpl } from "./repository/impl/user/user.repository.impl";
import { OrderRepositoryImpl } from "./repository/order/order.repository.impl";

export const userRepository = new UserRepositoryImpl(AppDataSource.getRepository(User));
export const orderRepository = new OrderRepositoryImpl(AppDataSource.getRepository(Order));
export const chatRoomRepository = new ChatRoomRepository(AppDataSource.getRepository(Order));
export const locationRepository = new LocationRepository(AppDataSource.getRepository(Order));
export const averageRepository = new AverageOfCostRepository(AppDataSource.getRepository(AverageOfCost));
export const receiverRepository = new ReceiverRepository();
export const deliveryPersonMatchedDateRepository = new DeliveryPersonMatchedDateRepository(
  AppDataSource.getRepository(DeliveryPersonMatchedDate),
);
