import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { FailDeliverImage, FailDeliverImageSchema } from "../../../../database/mongoose/models/fail-deliver-image";

import { FailDeliverImageRepository } from "../../../../database/mongoose/repository/impl/fail-deliver-image.repository";

let mongod: MongoMemoryServer;
let connector: Connection;
let model: Model<FailDeliverImage>;
let repository: FailDeliverImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  model = connector.model<FailDeliverImage>("failDeliverImage", FailDeliverImageSchema);
  repository = new FailDeliverImageRepository(model);
});

beforeEach(async () => {
  const image = new model({ _id: "아이디", image: Buffer.from("1"), reason: "이유" });
  await image.save();
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("CompleteDeliverImageRepository 테스트", () => {
  test("findFailImageByOrderId 테스트", async () => {
    const result = (await repository.findFailImageByOrderId("아이디")).toJSON();

    expect(result).toEqual({
      __v: 0,
      _id: "아이디",
      image: { data: [49], type: "Buffer" },
      reason: "이유",
    });
  });

  test("findFailImageByOrderId 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findFailImageByOrderId("존재하지 않는 아이디")).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
    );
  });
});
