import { FailDeliveryImageRepository } from "../../../database";

export class OrderFailImageService {
  constructor(private readonly repository: FailDeliveryImageRepository) {}

  async findOrderFailImage(orderId: string) {
    return this.repository.findFailDeliveryImageByOrderId(orderId);
  }
}
