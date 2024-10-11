import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import {
  CurrentDeliverLocation,
  CurrentDeliverLocationRepository,
  CurrentDeliverLocationSchema,
} from "../../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let CurrentDeliverLocationModel: Model<CurrentDeliverLocation>;
let repository: CurrentDeliverLocationRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  CurrentDeliverLocationModel = connector.model<CurrentDeliverLocation>(
    "completeDeliverImage",
    CurrentDeliverLocationSchema,
  );
  repository = new CurrentDeliverLocationRepository(CurrentDeliverLocationModel);
});

beforeEach(async () => {
  await CurrentDeliverLocationModel.create({
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

describe("updateLocation 테스트", () => {
  test("통과하는 테스트", async () => {
    const walletAddress = "지갑주소";

    await repository.updateLocation(walletAddress, { x: 112.1313, y: 37.5 });

    const result = await CurrentDeliverLocationModel.findById(walletAddress).select(["-__v", "-location._id"]);

    expect(result?.toObject()).toEqual({
      _id: walletAddress,
      location: [
        { x: 112.1314, y: 37.4 },
        { x: 112.1313, y: 37.5 },
      ],
    });
  });
});
