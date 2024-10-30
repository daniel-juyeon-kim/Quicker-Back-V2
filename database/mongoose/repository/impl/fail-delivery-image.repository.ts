import { Model } from "mongoose";
import { UnknownDataBaseError } from "../../../../core";
import { NotExistDataError } from "../../../type-orm";
import { FailDeliveryImage } from "../../models";
import { MongoRepository } from "../abstract.repository";

export class FailDeliveryImageRepository extends MongoRepository {
  constructor(private readonly model: Model<FailDeliveryImage>) {
    super();
  }

  async createFailDeliveryImage({
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

  async findFailDeliveryImageByOrderId(orderId: string) {
    try {
      const image = await this.model.findById(orderId);

      this.validateNull(image);

      return image;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${orderId}에 해당되는 실패 이미지가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
