import { parseNumericStringToNumberList } from "../../core";
import { createLastMonth } from "../../core/date";
import { AverageCostRepository } from "../../database";
import { OrderRepository } from "../../database/type-orm/repository/order/order.repository";
import { findDistanceKey } from "../../util/distance";
import { OrderService } from "./order.service";
import { createBasicTransportationEntity } from "./util";

export class OrderServiceImpl implements OrderService {
  private readonly orderRepository: OrderRepository;
  private readonly averageRepository: AverageCostRepository;

  constructor({
    orderRepository,
    averageCostRepository,
  }: {
    orderRepository: OrderRepository;
    averageCostRepository: AverageCostRepository;
  }) {
    this.orderRepository = orderRepository;
    this.averageRepository = averageCostRepository;
  }

  async findAllOrderDetail(stringTypeOrderIds: string) {
    const orderIds = parseNumericStringToNumberList(stringTypeOrderIds);
    return await this.orderRepository.findAllCreatedOrDeliveredOrderDetailByOrderIds(orderIds);
  }

  async findAllMatchableOrder(walletAddress: string) {
    return await this.orderRepository.findAllMatchableOrderByWalletAddress(walletAddress);
  }

  async createOrder(body: Parameters<OrderService["createOrder"]>[0]) {
    const transportation = createBasicTransportationEntity(body.transportation);

    await this.orderRepository.create({ ...body, transportation });
  }

  async findLatestOrderAverageCost(distance: string) {
    const distanceUnit = findDistanceKey(parseInt(distance));
    const lastMonth = createLastMonth(new Date());

    const averageCost = await this.averageRepository.findAverageCostByDateAndDistanceUnit({ distanceUnit, lastMonth });

    return { averageCost };
  }
}
