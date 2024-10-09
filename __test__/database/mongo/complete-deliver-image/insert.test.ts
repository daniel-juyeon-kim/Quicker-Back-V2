import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import {
  CompleteDeliverImage,
  CompleteDeliverImageSchema,
} from "../../../../database/mongoose/models/complete-deliver-image";

import { CompleteDeliverImageRepository } from "../../../../database/mongoose/repository/impl/complete-deliver-image.repository";

let mongod: MongoMemoryServer;
let connector: Connection;
let model: Model<CompleteDeliverImage>;
let repository: CompleteDeliverImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  model = connector.model<CompleteDeliverImage>("completeDeliverImage", CompleteDeliverImageSchema);
  repository = new CompleteDeliverImageRepository(model);
});

afterAll(async () => {
  await connector.dropDatabase();
  await connector.destroy();
  await mongod.stop();
});

describe("CompleteDeliverImageRepository 테스트", () => {
  test("create 테스트", async () => {
    await repository.create({ orderId: "아이디", bufferImage: Buffer.from("1") });

    const result = await model.findById("아이디");

    expect(result?.toJSON()).toEqual({
      __v: 0,
      _id: "아이디",
      image: { data: [49], type: "Buffer" },
    });
  });
});
