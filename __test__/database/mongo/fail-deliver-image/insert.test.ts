import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { FailDeliverImage, FailDeliverImageRepository, FailDeliverImageSchema } from "../../../../database/mongoose";

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

afterAll(async () => {
  await connector.dropDatabase();
  await connector.destroy();
  await mongod.stop();
});

describe("FailDeliverImageRepository 테스트", () => {
  test("createFailDeliverImage 테스트", async () => {
    await repository.createFailDeliverImage({ orderId: "아이디", bufferImage: Buffer.from("1"), reason: "이유" });

    const result = await model.findById("아이디");

    expect(result?.toJSON()).toEqual({
      __v: 0,
      _id: "아이디",
      image: { data: [49], type: "Buffer" },
      reason: "이유",
    });
  });
});
