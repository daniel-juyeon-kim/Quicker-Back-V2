import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import {
  CurrentDeliverLocation,
  CurrentDeliverLocationRepository,
  CurrentDeliverLocationSchema,
} from "../../../../database/mongoose";

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

beforeEach(async () => {
  await model.create({
    _id: "지갑주소",
    location: [{ x: 112.1314, y: 37.4 }],
  });
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("CurrentDeliverLocationRepository 테스트", () => {
  test("updateLocation 테스트", async () => {
    await repository.updateLocation("지갑주소", { x: 112.1313, y: 37.5 });

    const result = await model.findById("지갑주소").select(["-__v", "-location._id"]);

    expect(result?.toJSON()).toEqual({
      _id: "지갑주소",
      location: [
        { x: 112.1314, y: 37.4 },
        { x: 112.1313, y: 37.5 },
      ],
    });
  });
});
