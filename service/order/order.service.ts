import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";

export interface OrderService {
  createOrder(body: OrderControllerRequestData["createOrder"]): Promise<void>;
}
