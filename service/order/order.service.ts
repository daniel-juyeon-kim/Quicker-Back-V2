import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";

export interface OrderService {
  matchDeliveryPersonAtOrder(body: OrderControllerRequestData["updateOrderDeliveryPerson"]): Promise<void>;
  createOrder(body: OrderControllerRequestData["createOrder"]): Promise<void>;
}
