import { OrderParticipantRepository } from "../../../database";

export class SenderReceiverService {
  constructor(private readonly repository: OrderParticipantRepository) {}

  async findSenderReceiverInfo(orderId: string) {
    return await this.repository.findSenderReceiverInfoByOrderId(parseInt(orderId));
  }
}
