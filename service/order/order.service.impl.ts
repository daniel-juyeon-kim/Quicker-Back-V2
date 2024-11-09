import { DataSource } from "typeorm";
import { parseNumericStringToNumberList } from "../../core";
import { DeliveryPersonMatchedDateRepository, ReceiverRepository } from "../../database";
import { OrderRepository } from "../../database/type-orm/repository/order/order.repository";
import { DeliveryUrlMessage } from "./delivery-url-message";
import { OrderService } from "./order.service";
import { createBasicTransportationEntity } from "./util";

export class OrderServiceImpl implements OrderService {
  private readonly dataSource: DataSource;
  private readonly orderRepository: OrderRepository;
  private readonly receiverRepository: ReceiverRepository;
  private readonly deliverUrlMessage: DeliveryUrlMessage;
  private readonly deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;

  constructor({
    dataSource,
    orderRepository,
    receiverRepository,
    deliveryUrlMessage,
    deliveryPersonMatchedDateRepository,
  }: {
    dataSource: DataSource;
    orderRepository: OrderRepository;
    receiverRepository: ReceiverRepository;
    deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
    deliveryUrlMessage: DeliveryUrlMessage;
  }) {
    this.dataSource = dataSource;
    this.orderRepository = orderRepository;
    this.receiverRepository = receiverRepository;
    this.deliverUrlMessage = deliveryUrlMessage;
    this.deliveryPersonMatchedDateRepository = deliveryPersonMatchedDateRepository;
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

  async matchDeliveryPersonAtOrder({
    orderId: stringTypeOrderId,
    walletAddress,
  }: Parameters<OrderService["matchDeliveryPersonAtOrder"]>[0]) {
    await this.dataSource.transaction(async (manager) => {
      const orderId = parseInt(stringTypeOrderId);

      await this.orderRepository.updateDeliveryPersonAtOrder(manager, { orderId, walletAddress });
      await this.deliveryPersonMatchedDateRepository.create(manager, orderId);
      const receiver = await this.receiverRepository.findPhoneNumberByOrderId(manager, orderId);

      await this.deliverUrlMessage.sendToReceiver(receiver, { orderId, walletAddress });
    });
  }
}
