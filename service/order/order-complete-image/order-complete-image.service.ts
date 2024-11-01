import { CompleteDeliveryImageRepository } from "../../../database";

export class OrderCompleteImageService {
  constructor(private readonly repository: CompleteDeliveryImageRepository) {}

  async findCompleteImageBuffer(orderId: string) {
    const buffer = await this.repository.findCompleteImageBufferByOrderId(parseInt(orderId));
    return buffer;
  }
}
