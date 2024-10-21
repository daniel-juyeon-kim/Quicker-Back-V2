import { OrderRepository } from "../../database/type-orm/repository/order/order.repository";
import { OrderService } from "./order.service";
import { createBasicTransportationEntity } from "./util";

export class OrderServiceImpl implements OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async createOrder(body: Parameters<OrderService["createOrder"]>[0]) {
    const transportation = createBasicTransportationEntity(body.transportation);

    await this.repository.create({ ...body, transportation });
  }
}
