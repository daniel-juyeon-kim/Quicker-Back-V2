import { Model } from "mongoose";
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
    const locations = await this.model.findOne({ _id: walletAddress }).select(["-__v", "-_id", "-location._id"]);

    this.validateNull(locations);

    const location = locations.toJSON().location.pop();

    return location;
  }
}
