import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import {
  CurrentDeliverLocation,
  CurrentDeliverLocationSchema,
} from "../../../../database/mongoose/models/current-deliver-location";
import { CurrentDeliverLocationRepository } from "../../../../database/mongoose/repository/impl/current-deliver-location.repository";

let mongod: MongoMemoryServer;
let connector: Connection;
let model: Model<CurrentDeliverLocation>;
let repository: CurrentDeliverLocationRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  model = connector.model<CurrentDeliverLocation>("completeDeliverImage", CurrentDeliverLocationSchema);
  repository = new CurrentDeliverLocationRepository(model);
});

afterAll(async () => {
  await connector.dropDatabase();
  await connector.destroy();
  await mongod.stop();
});

describe("CurrentDeliverLocationRepository 테스트", () => {
  test("createLocation 테스트", async () => {
    await repository.createLocation("지갑주소", { x: 112.1314, y: 37.4 });

    const result = await model.findById("지갑주소").select(["-__v", "-location._id"]);

    expect(result?.toJSON()).toEqual({
      _id: "지갑주소",
      location: [{ x: 112.1314, y: 37.4 }],
    });
  });
});
