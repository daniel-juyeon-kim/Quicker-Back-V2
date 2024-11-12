import { Order } from "../../database";
import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";

export interface OrderService {
  findAllOrderDetail(stringTypeOrderIds: string): Promise<Order[]>;
  findAllMatchableOrder(walletAddress: string): Promise<Order[]>;
  createOrder(body: OrderControllerRequestData["createOrder"]): Promise<void>;
}
