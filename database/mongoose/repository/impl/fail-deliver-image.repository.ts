import { Model } from "mongoose";
import { FailDeliverImage } from "../../models/fail-deliver-image";
import { MongoRepository } from "../abstract.repository";

export class FailDeliverImageRepository extends MongoRepository {
  constructor(private readonly model: Model<FailDeliverImage>) {
    super();
  }

  async createFailDeliverImage({
    orderId,
    bufferImage,
    reason,
  }: {
    orderId: string;
    bufferImage: Buffer;
    reason: string;
  }) {
    const image = new this.model({
      _id: orderId,
      image: bufferImage,
      reason,
    });
    await image.save();
  }

  async findFailImageByOrderId(orderId: string) {
    const image = await this.model.findById(orderId);

    this.validateNull(image);

    return image;
  }
}
