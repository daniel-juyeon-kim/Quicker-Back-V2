import { Model } from "mongoose";
import { CompleteDeliverImage } from "../../models/complete-deliver-image";
import { MongoRepository } from "../abstract.repository";

export class CompleteDeliverImageRepository extends MongoRepository {
  constructor(private readonly model: Model<CompleteDeliverImage>) {
    super();
  }

  async create({ orderId, bufferImage }: { orderId: string; bufferImage: Buffer }) {
    const image = new this.model({ _id: orderId, image: bufferImage });
    await image.save();
  }

  async findByOrderId(orderId: string) {
    const image = await this.model.findById(orderId);

    this.validateNull(image);

    return image.toJSON();
  }
}
