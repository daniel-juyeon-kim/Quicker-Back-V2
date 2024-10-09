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
    location: [
      { x: 112.1314, y: 37.4 },
      { x: 112.1314, y: 37.4 },
      { x: 112.1314, y: 37.4 },
      { x: 112.1314, y: 37.4 },
      { x: 112.1313, y: 37.3 },
    ],
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
  test("findByWalletAddress 테스트", async () => {
    const result = await repository.findCurrentLocationByWalletAddress("지갑주소");

    expect(result).toEqual({ x: 112.1313, y: 37.3 });
  });

  test("findByWalletAddress 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findCurrentLocationByWalletAddress("존재하지 않는 지갑주소")).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
    );
  });
});
