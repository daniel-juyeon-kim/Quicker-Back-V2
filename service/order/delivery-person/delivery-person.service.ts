import { DataSource } from "typeorm";
import {
  CurrentDeliveryLocationRepository,
  DeliveryPersonMatchedDateRepository,
  OrderRepository,
  ReceiverRepository,
} from "../../../database";
import { DeliveryUrlMessage } from "../delivery-url-message";

export class DeliveryPersonService {
  private readonly dataSource: DataSource;
  private readonly orderRepository: OrderRepository;
  private readonly receiverRepository: ReceiverRepository;
  private readonly deliverUrlMessage: DeliveryUrlMessage;
  private readonly deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
  private readonly currentDeliveryLocationRepository: CurrentDeliveryLocationRepository;

  constructor({
    dataSource,
    orderRepository,
    receiverRepository,
    deliveryUrlMessage,
    deliveryPersonMatchedDateRepository,
    currentDeliveryLocationRepository,
  }: {
    dataSource: DataSource;
    orderRepository: OrderRepository;
    receiverRepository: ReceiverRepository;
    deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
    deliveryUrlMessage: DeliveryUrlMessage;
    currentDeliveryLocationRepository: CurrentDeliveryLocationRepository;
  }) {
    this.dataSource = dataSource;
    this.orderRepository = orderRepository;
    this.receiverRepository = receiverRepository;
    this.deliverUrlMessage = deliveryUrlMessage;
    this.deliveryPersonMatchedDateRepository = deliveryPersonMatchedDateRepository;
    this.currentDeliveryLocationRepository = currentDeliveryLocationRepository;
  }

  async findCurrentLocation(orderId: string) {
    return await this.currentDeliveryLocationRepository.findCurrentLocationByOrderId(parseInt(orderId));
  }

  async createDeliveryPersonCurrentLocation({ orderId, x, y }: { x: number; y: number; orderId: number }) {
    await this.currentDeliveryLocationRepository.saveDeliveryPersonLocation(orderId, { x, y });
  }

  async matchDeliveryPersonAtOrder({
    orderId: stringTypeOrderId,
    walletAddress,
  }: {
    orderId: string;
    walletAddress: string;
  }) {
    await this.dataSource.transaction(async (manager) => {
      const orderId = parseInt(stringTypeOrderId);

      await this.orderRepository.updateDeliveryPersonAtOrder(manager, { orderId, walletAddress });
      await this.deliveryPersonMatchedDateRepository.create(manager, orderId);
      const receiver = await this.receiverRepository.findPhoneNumberByOrderId(manager, orderId);

      await this.deliverUrlMessage.sendToReceiver(receiver, { orderId, walletAddress });
    });
  }
}
