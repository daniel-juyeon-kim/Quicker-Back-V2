import { CompleteDeliveryImageRepository } from "../../../database";

export class OrderCompleteImageService {
  constructor(private readonly repository: CompleteDeliveryImageRepository) {}

  async findCompleteImageBuffer(orderId: string) {
    return await this.repository.findCompleteImageBufferByOrderId(parseInt(orderId));
  }

  async createCompleteImage({ orderId, file }: { orderId: number; file: Express.Multer.File }) {
    const bufferImage = file.buffer;
    await this.repository.create({ orderId, bufferImage });
  }
}
