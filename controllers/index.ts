import { AdminController } from "./admin";
import { ChatController } from "./chat";
import { ErrorController } from "./error";
import { OrderController } from "./order";
import { UserController } from "./user";

const adminController = new AdminController();
const chatController = new ChatController();
const errorController = new ErrorController();
const orderController = new OrderController();
const userController = new UserController();

export {
  adminController,
  chatController,
  errorController,
  orderController,
  userController,
};