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

beforeEach(async () => {
  const image = new CompleteDeliverImageModel({ _id: "아이디", image: Buffer.from("1") });
  await image.save();
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("findByOrderId 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = "아이디";

    await expect(repository.findByOrderId(orderId)).resolves.toEqual({
      __v: 0,
      _id: orderId,
      image: { data: [49], type: "Buffer" },
    });
  });

  test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findByOrderId("존재하지 않는 아이디")).rejects.toThrow("데이터가 존재하지 않습니다.");
  });
});
