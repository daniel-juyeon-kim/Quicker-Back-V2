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

beforeEach(async () => {
  const image = new model({ _id: "아이디", image: Buffer.from("1") });
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
  test("findByOrderId 테스트", async () => {
    const result = (await repository.findByOrderId("아이디")).toJSON();

    expect(result).toEqual({
      __v: 0,
      _id: "아이디",
      image: { data: [49], type: "Buffer" },
    });
  });

  test("findByOrderId 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findByOrderId("존재하지 않는 아이디")).rejects.toThrow("데이터가 존재하지 않습니다.");
  });
});
