import { AdminController } from "./admin";
import { ChatController } from "./chat";
import { OrderController } from "./order";
import { UserController } from "./user";
export { errorController } from "./error";

export const adminController = new AdminController();
export const chatController = new ChatController();
export const orderController = new OrderController();
export const userController = new UserController();
