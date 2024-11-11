import { Model } from "mongoose";
import { UnknownDataBaseError } from "../../../../core";
import { NotExistDataError } from "../../../type-orm";
import { CurrentDeliveryLocation, Location } from "../../models/current-deliver-location";
import { MongoRepository } from "../abstract.repository";
export class CurrentDeliveryLocationRepository extends MongoRepository {
  constructor(private readonly model: Model<CurrentDeliveryLocation>) {
    super();
  }

  async saveDeliveryPersonLocation(orderId: number, location: Location) {
    const session = await this.model.startSession();
    session.startTransaction();

    try {
      if (await this.model.exists({ _id: orderId })) {
        await this.model.findByIdAndUpdate(orderId, { location });
        await session.commitTransaction();
        return;
      }

      await this.model.create({ _id: orderId, location });
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw new UnknownDataBaseError(error);
    } finally {
      session.endSession();
    }
  }

  async findCurrentLocationByOrderId(orderId: number) {
    try {
      const document = await this.model.findOne({ _id: orderId }).select(["-_id", "location.x", "location.y"]).lean();

      this.validateNull(document);

      return document.location;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${orderId}에 대한 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
