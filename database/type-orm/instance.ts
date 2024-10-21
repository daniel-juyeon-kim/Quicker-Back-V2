import { AppDataSource } from "../../loaders/data-source";
import { AverageOfCost, Order, Recipient, User } from "./entity";
import { AverageOfCostRepository, ChatRoomRepository, LocationRepository, RecipientRepository } from "./repository";
import { UserRepositoryImpl } from "./repository/impl/user/user.repository.impl";
import { OrderRepositoryImpl } from "./repository/order/order.repository.impl";

export const userRepository = new UserRepositoryImpl(AppDataSource.getRepository(User));
export const orderRepository = new OrderRepositoryImpl(AppDataSource.getRepository(Order));
export const chatRoomRepository = new ChatRoomRepository(AppDataSource.getRepository(Order));
export const locationRepository = new LocationRepository(AppDataSource.getRepository(Order));
export const averageRepository = new AverageOfCostRepository(AppDataSource.getRepository(AverageOfCost));
export const recipientRepository = new RecipientRepository(AppDataSource.getRepository(Recipient));
