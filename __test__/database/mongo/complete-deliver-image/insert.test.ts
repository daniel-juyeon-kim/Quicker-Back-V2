import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";

import {
  CompleteDeliverImage,
  CompleteDeliverImageRepository,
  CompleteDeliverImageSchema,
} from "../../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let CompleteDeliverImageModel: Model<CompleteDeliverImage>;
let repository: CompleteDeliverImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  CompleteDeliverImageModel = connector.model<CompleteDeliverImage>("completeDeliverImage", CompleteDeliverImageSchema);
  repository = new CompleteDeliverImageRepository(CompleteDeliverImageModel);
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("create 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = "아이디";

    await repository.create({ orderId, bufferImage: Buffer.from("1") });

    const result = await CompleteDeliverImageModel.findById(orderId);

    expect(result?.toJSON()).toEqual({
      __v: 0,
      _id: orderId,
      image: { data: [49], type: "Buffer" },
    });
  });
});
