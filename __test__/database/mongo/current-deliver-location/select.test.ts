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

describe("findByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(repository.findCurrentLocationByWalletAddress("지갑주소")).resolves.toEqual({ x: 112.1313, y: 37.3 });
  });

  test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findCurrentLocationByWalletAddress("존재하지 않는 지갑주소")).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
    );
  });
});
