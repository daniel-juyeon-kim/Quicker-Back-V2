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

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("createFailDeliverImage 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = "아이디";

    await repository.createFailDeliverImage({ orderId, bufferImage: Buffer.from("1"), reason: "이유" });

    const result = await FailDeliverImageModel.findById(orderId);

    expect(result?.toJSON()).toEqual({
      __v: 0,
      _id: orderId,
      image: { data: [49], type: "Buffer" },
      reason: "이유",
    });
  });
});
