import { FailDeliveryImageRepository } from "../../../database";

export class OrderFailImageService {
  constructor(private readonly repository: FailDeliveryImageRepository) {}

  async findOrderFailImage(orderId: string) {
    return await this.repository.findFailDeliveryImageByOrderId(parseInt(orderId));
  }

  async createFailImage({ orderId, reason, file }: { orderId: number; reason: string; file: Express.Multer.File }) {
    const bufferImage = file.buffer;
    await this.repository.createFailDeliveryImage({ orderId, reason, bufferImage });
  }
}
