import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";
import { OrderIdParam } from "../../validator/schema/routes/params";

export interface OrderService {
  matchDeliveryPersonAtOrder(
    body: OrderControllerRequestData["updateOrderDeliveryPerson"] & OrderIdParam,
  ): Promise<void>;
  createOrder(body: OrderControllerRequestData["createOrder"]): Promise<void>;
}
