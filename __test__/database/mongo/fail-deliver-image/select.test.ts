import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { FailDeliverImage, FailDeliverImageRepository, FailDeliverImageSchema } from "../../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let FailDeliverImageModel: Model<FailDeliverImage>;
let repository: FailDeliverImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  FailDeliverImageModel = connector.model<FailDeliverImage>("failDeliverImage", FailDeliverImageSchema);
  repository = new FailDeliverImageRepository(FailDeliverImageModel);
});

beforeEach(async () => {
  const image = new FailDeliverImageModel({ _id: "아이디", image: Buffer.from("1"), reason: "이유" });
  await image.save();
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("findFailImageByOrderId 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = "아이디";
    const result = (await repository.findFailImageByOrderId(orderId)).toJSON();

    expect(result).toEqual({
      __v: 0,
      _id: orderId,
      image: { data: [49], type: "Buffer" },
      reason: "이유",
    });
  });

  test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findFailImageByOrderId("존재하지 않는 아이디")).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
    );
  });
});
