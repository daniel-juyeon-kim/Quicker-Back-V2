import { DataSource } from "typeorm";
import { Order } from "../../entity/order.entity";
import { AbstractRepository } from "../abstract-repository";

export class ChatRoomRepository extends AbstractRepository<Order> {
  constructor(dataSource: DataSource) {
    super(dataSource, Order);
  }

  async findChatParticipantByOrderId(orderId: number) {
    const order = await this.repository.manager.findOne(Order, {
      relations: {
        departure: { sender: true },
        destination: { recipient: true },
      },
      where: {
        id: orderId,
      },
      select: {
        id: true,
        departure: {
          id: true,
          x: true,
          y: true,
          sender: { phone: true },
        },
        destination: {
          id: true,
          x: true,
          y: true,
          recipient: { phone: true },
        },
      },
    });

    this.validateNull(order);

    return order;
  }
}
