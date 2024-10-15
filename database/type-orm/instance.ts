import { AppDataSource } from "../../loaders/data-source";
import { AverageOfCost, Order, Recipient, User } from "./entity";
import {
  AverageOfCostRepository,
  ChatRoomRepository,
  LocationRepository,
  OrderRepository,
  RecipientRepository,
} from "./repository";
import { UserRepositoryImpl } from "./repository/impl/user/user.repository.impl";

export const userRepository = new UserRepositoryImpl(AppDataSource.getRepository(User));
export const orderRepository = new OrderRepository(AppDataSource.getRepository(Order));
export const chatRoomRepository = new ChatRoomRepository(AppDataSource.getRepository(Order));
export const locationRepository = new LocationRepository(AppDataSource.getRepository(Order));
export const averageRepository = new AverageOfCostRepository(AppDataSource.getRepository(AverageOfCost));
export const recipientRepository = new RecipientRepository(AppDataSource.getRepository(Recipient));
