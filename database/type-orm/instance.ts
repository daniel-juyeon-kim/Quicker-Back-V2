import { AppDataSource } from "../../loaders/data-source";
import { AverageOfCost, DeliveryPersonMatchedDate, Order, User } from "./entity";
import {
  AverageCostRepository,
  DeliveryPersonMatchedDateRepository,
  LocationRepositoryImpl,
  OrderParticipantRepository,
  OrderRepositoryImpl,
  ReceiverRepository,
} from "./repository";
import { UserRepositoryImpl } from "./repository/impl/user/user.repository.impl";

export const userRepository = new UserRepositoryImpl(AppDataSource.getRepository(User));
export const orderRepository = new OrderRepositoryImpl(AppDataSource.getRepository(Order));
export const orderParticipantRepository = new OrderParticipantRepository(AppDataSource.getRepository(Order));
export const locationRepository = new LocationRepositoryImpl(AppDataSource.getRepository(Order));
export const averageCostRepository = new AverageCostRepository(AppDataSource.getRepository(AverageOfCost));
export const receiverRepository = new ReceiverRepository();
export const deliveryPersonMatchedDateRepository = new DeliveryPersonMatchedDateRepository(
  AppDataSource.getRepository(DeliveryPersonMatchedDate),
);
