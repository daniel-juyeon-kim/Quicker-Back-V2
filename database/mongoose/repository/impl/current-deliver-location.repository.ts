import { Model } from "mongoose";
import { isEmptyArray } from "../../../../util";
import { CurrentDeliverLocation, Location } from "../../models/current-deliver-location";
import { MongoRepository } from "../abstract.repository";
export class CurrentDeliverLocationRepository extends MongoRepository {
  constructor(private readonly model: Model<CurrentDeliverLocation>) {
    super();
  }

  async createLocation(walletAddress: string, location: Location) {
    await this.model.create({ _id: walletAddress, location: [location] });
  }

  async updateLocation(walletAddress: string, location: Location) {
    await this.model.updateOne({ _id: walletAddress }, { $push: { location: location } });
  }

  async findCurrentLocationByWalletAddress(walletAddress: string) {
    const currentLocationDocument = await this.model
      .findOne({ _id: walletAddress })
      .select(["-_id", "location.x", "location.y"]);

    this.validateNull(currentLocationDocument);

    const location = currentLocationDocument.toObject().location;

    this.validateEmptyArray(location);

    return location[location.length - 1];
  }

  private validateEmptyArray(location: Location[]) {
    if (isEmptyArray(location)) {
      throw new Error("데이터가 존재하지 않습니다.");
    }
  }
}
