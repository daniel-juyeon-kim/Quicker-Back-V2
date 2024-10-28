import { Repository } from "typeorm";
import { Order } from "../../entity/order.entity";
import { AbstractRepository } from "../abstract-repository";

export class ChatRoomRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
  }

  async findChatParticipantByOrderId(orderId: number) {
    const order = await this.repository.findOne({
      relations: {
        departure: { sender: true },
        destination: { receiver: true },
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
          receiver: { phone: true },
        },
      },
    });

    this.validateNotNull(order);

    return order;
  }
}
