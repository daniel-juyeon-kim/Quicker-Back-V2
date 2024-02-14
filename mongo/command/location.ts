import { Connection } from "mongoose";
import RealLocationSchema from "../schemas/real-location";

export class CurrentLocationModel {
  async create (connection: Connection,address : any, location : any) {
    const realLocationSchema = connection.model(address, RealLocationSchema);
    const realLocationModel = new realLocationSchema(location);
    await realLocationModel.save();
    await connection.destroy();
  }

  async find (connection: Connection, address : any ) {
    const realLocationModel = connection.model(address, RealLocationSchema);
    const loaction = await realLocationModel.findOne({}).sort({ $natural: -1 });
    await connection.destroy();
    return loaction;
  }
}