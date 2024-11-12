import { parseNumericStringToNumberList } from "../../core";
import { OrderRepository } from "../../database/type-orm/repository/order/order.repository";
import { OrderService } from "./order.service";
import { createBasicTransportationEntity } from "./util";

export class OrderServiceImpl implements OrderService {
  private readonly repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  async findAllOrderDetail(stringTypeOrderIds: string) {
    const orderIds = parseNumericStringToNumberList(stringTypeOrderIds);
    return await this.repository.findAllCreatedOrDeliveredOrderDetailByOrderIds(orderIds);
  }

  async findAllMatchableOrder(walletAddress: string) {
    return await this.repository.findAllMatchableOrderByWalletAddress(walletAddress);
  }

  async createOrder(body: Parameters<OrderService["createOrder"]>[0]) {
    const transportation = createBasicTransportationEntity(body.transportation);

    await this.repository.create({ ...body, transportation });
  }
}
