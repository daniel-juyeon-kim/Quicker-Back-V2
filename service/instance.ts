import { orderRepository, userRepository } from "../database";
import { OrderServiceImpl } from "./order/order.service.impl";
import { UserServiceImpl } from "./user/user.service.impl";

export const userService = new UserServiceImpl(userRepository);
export const orderService = new OrderServiceImpl(orderRepository);
