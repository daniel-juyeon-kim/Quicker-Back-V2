import { Model } from "mongoose";
import { UnknownDataBaseError } from "../../../../core";
import { isEmptyArray, isNull } from "../../../../util";
import { NotExistDataError } from "../../../type-orm";
import { CurrentDeliveryLocation, Location } from "../../models/current-deliver-location";
import { MongoRepository } from "../abstract.repository";
export class CurrentDeliveryLocationRepository extends MongoRepository {
  constructor(private readonly model: Model<CurrentDeliveryLocation>) {
    super();
  }

  async createLocation(walletAddress: string, location: Location) {
    await this.model.create({ _id: walletAddress, location: [location] });
  }

  async updateLocation(walletAddress: string, location: Location) {
    await this.model.updateOne({ _id: walletAddress }, { $push: { location: location } });
  }

  async findCurrentLocationByOrderId(orderId: number) {
    try {
      const currentLocationDocument = await this.model
        .findOne({ _id: orderId })
        .select(["-_id", "location.x", "location.y"])
        .lean();

      if (isNull(currentLocationDocument)) {
        throw new NotExistDataError(`${orderId}에 대한 데이터가 존재하지 않습니다.`);
      }

      const location = currentLocationDocument.location;

      if (isEmptyArray(location)) {
        throw new NotExistDataError(`${orderId}에 대한 데이터가 존재하지 않습니다.`);
      }

      return location[location.length - 1];
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
