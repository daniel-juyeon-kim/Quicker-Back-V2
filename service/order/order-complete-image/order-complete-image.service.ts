import { Request } from "express";
import { CompleteDeliveryImageRepository } from "../../../database";

export class OrderCompleteImageService {
  constructor(private readonly repository: CompleteDeliveryImageRepository) {}

  async findCompleteImageBuffer(orderId: string) {
    const buffer = await this.repository.findCompleteImageBufferByOrderId(parseInt(orderId));
    return buffer;
  }

  async createCompleteImage({ orderId, file }: { orderId: number; file: Exclude<Request["file"], undefined> }) {
    const bufferImage = file.buffer;
    await this.repository.create({ orderId, bufferImage });
  }
}
