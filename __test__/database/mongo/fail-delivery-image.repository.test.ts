import { afterEach } from "@jest/globals";
import { mock } from "jest-mock-extended";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { UnknownDataBaseError } from "../../../core";
import { DuplicatedDataError, NotExistDataError } from "../../../database";
import { FailDeliveryImage, FailDeliveryImageRepository, FailDeliveryImageSchema } from "../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let FailDeliveryImageModel: Model<FailDeliveryImage>;
let repository: FailDeliveryImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  FailDeliveryImageModel = connector.model<FailDeliveryImage>("failDeliveryImage", FailDeliveryImageSchema);
  repository = new FailDeliveryImageRepository(FailDeliveryImageModel);
});

describe("FailDeliveryImageRepository", () => {
  describe("findFailImageByOrderId()", () => {
    beforeAll(async () => {
      const image = new FailDeliveryImageModel({ _id: 1, image: Buffer.from("1"), reason: "이유" });
      await image.save();
    });

    afterAll(async () => {
      await FailDeliveryImageModel.deleteMany();
    });

    test("통과하는 테스트", async () => {
      const orderId = 1;
      const result = (await repository.findFailDeliveryImageByOrderId(orderId)).toJSON();

      expect(result).toEqual({
        __v: 0,
        _id: orderId,
        image: { data: [49], type: "Buffer" },
        reason: "이유",
      });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      const orderId = 2;

      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toStrictEqual(
        new NotExistDataError(`${orderId}에 해당되는 실패 이미지가 존재하지 않습니다.`),
      );
    });

    test("실패하는 테스트, 알 수 없는 에러 발생", async () => {
      const model = mock<Model<FailDeliveryImage>>();
      const repository = new FailDeliveryImageRepository(model);

      const orderId = 1;
      const error = new Error("알 수 없는 에러");

      model.findById.mockRejectedValue(error);

      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toBeInstanceOf(UnknownDataBaseError);
      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toStrictEqual(
        expect.objectContaining(error),
      );
    });
  });

  describe("createFailDeliveryImage()", () => {
    afterEach(async () => {
      await FailDeliveryImageModel.deleteMany();
    });

    test("통과하는 테스트", async () => {
      const orderId = 1;

      await repository.createFailDeliveryImage({ orderId, bufferImage: Buffer.from("1"), reason: "이유" });

      const result = await FailDeliveryImageModel.findById(orderId);

      expect(result?.toJSON()).toEqual({
        __v: 0,
        _id: orderId,
        image: { data: [49], type: "Buffer" },
        reason: "이유",
      });
    });

    test("실패하는 테스트, 중복 데이터", async () => {
      const image = new FailDeliveryImageModel({ _id: 1, image: Buffer.from("1"), reason: "이유" });
      await image.save();

      const orderId = 1;

      await expect(
        repository.createFailDeliveryImage({ orderId, bufferImage: Buffer.from("1"), reason: "이유" }),
      ).rejects.toStrictEqual(new DuplicatedDataError(`${orderId}에 해당되는 데이터가 이미 존재합니다.`));
    });
  });
});
