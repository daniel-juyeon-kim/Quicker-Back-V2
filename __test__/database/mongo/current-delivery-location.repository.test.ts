import { expect } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import {
  CurrentDeliveryLocation,
  CurrentDeliveryLocationRepository,
  CurrentDeliveryLocationSchema,
  NotExistDataError,
} from "../../../database";

let mongod: MongoMemoryServer;
let connector: Connection;
let CurrentDeliverLocationModel: Model<CurrentDeliveryLocation>;
let repository: CurrentDeliveryLocationRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  CurrentDeliverLocationModel = connector.model<CurrentDeliveryLocation>(
    "completeDeliverImage",
    CurrentDeliveryLocationSchema,
  );
  repository = new CurrentDeliveryLocationRepository(CurrentDeliverLocationModel);
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("CurrentDeliverLocationRepository", () => {
  test("should have a method createLocation()", async () => {
    // await instance.createLocation(walletAddress,location);
  });

  test("should have a method updateLocation()", async () => {
    // await instance.updateLocation(walletAddress,location);
  });

  describe("findByWalletAddress 테스트", () => {
    beforeEach(async () => {
      await CurrentDeliverLocationModel.create({
        _id: 1,
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
      await CurrentDeliverLocationModel.deleteMany();
    });

    test("통과하는 테스트", async () => {
      await expect(repository.findCurrentLocationByOrderId(1)).resolves.toEqual({ x: 112.1313, y: 37.3 });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      const notExistOrderId = 99;
      await expect(repository.findCurrentLocationByOrderId(notExistOrderId)).rejects.toStrictEqual(
        new NotExistDataError(`${notExistOrderId}에 대한 데이터가 존재하지 않습니다.`),
      );
    });
  });
});
