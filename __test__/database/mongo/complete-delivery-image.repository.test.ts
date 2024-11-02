import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { DuplicatedDataError, NotExistDataError } from "../../../database";
import {
  CompleteDeliveryImage,
  CompleteDeliveryImageRepository,
  CompleteDeliveryImageSchema,
} from "../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let CompleteDeliverImageModel: Model<CompleteDeliveryImage>;
let repository: CompleteDeliveryImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  CompleteDeliverImageModel = connector.model<CompleteDeliveryImage>(
    "completeDeliveryImage",
    CompleteDeliveryImageSchema,
  );
  repository = new CompleteDeliveryImageRepository(CompleteDeliverImageModel);
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("CompleteDeliveryImageRepository", () => {
  describe("findByOrderId 테스트", () => {
    beforeEach(async () => {
      const image = new CompleteDeliverImageModel({ _id: 1, bufferImage: Buffer.from("1") });
      await image.save();
    });

    afterEach(async () => {
      await CompleteDeliverImageModel.deleteMany();
    });

    test("통과하는 테스트", async () => {
      const orderId = 1;

      await expect(repository.findCompleteImageBufferByOrderId(orderId)).resolves.toEqual({
        data: [49],
        type: "Buffer",
      });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      const orderId = 3;
      await expect(repository.findCompleteImageBufferByOrderId(orderId)).rejects.toStrictEqual(
        new NotExistDataError(`${orderId}에 해당되는 이미지 버퍼가 존재하지 않습니다.`),
      );
    });
  });

  describe("create 테스트", () => {
    afterEach(async () => {
      await connector.dropDatabase();
    });

    test("통과하는 테스트", async () => {
      const orderId = 1;

      await repository.create({ orderId, bufferImage: Buffer.from("1") });

      const result = await CompleteDeliverImageModel.findById(orderId);

      expect(result?.toJSON()).toEqual({
        __v: 0,
        _id: 1,
        bufferImage: { data: [49], type: "Buffer" },
      });
    });

    describe("실패하는 테스트", () => {
      test("중복된 데이터", async () => {
        const image = new CompleteDeliverImageModel({ _id: 1, bufferImage: Buffer.from("1") });
        await image.save();

        const orderId = 1;

        await expect(repository.create({ orderId, bufferImage: Buffer.from("1") })).rejects.toStrictEqual(
          new DuplicatedDataError(`${orderId}에 해당되는 데이터가 이미 존재합니다.`),
        );
      });
    });
  });
});
