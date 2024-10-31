import { Request } from "express";
import { FailDeliveryImageRepository } from "../../../database";

export class OrderFailImageService {
  constructor(private readonly repository: FailDeliveryImageRepository) {}

  async findOrderFailImage(orderId: string) {
    return await this.repository.findFailDeliveryImageByOrderId(parseInt(orderId));
  }

  async createFailImage({
    orderId,
    reason,
    file,
  }: {
    orderId: number;
    reason: string;
    file: Exclude<Request["file"], undefined>;
  }) {
    const bufferImage = file.buffer;
    return await this.repository.createFailDeliveryImage({ orderId, reason, bufferImage });
  }
}
