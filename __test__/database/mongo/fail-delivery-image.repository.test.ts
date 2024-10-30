import { mock } from "jest-mock-extended";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { UnknownDataBaseError } from "../../../core";
import { FailDeliveryImage, FailDeliveryImageRepository, FailDeliveryImageSchema } from "../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let FailDeliverImageModel: Model<FailDeliveryImage>;
let repository: FailDeliveryImageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  FailDeliverImageModel = connector.model<FailDeliveryImage>("failDeliveryImage", FailDeliveryImageSchema);
  repository = new FailDeliveryImageRepository(FailDeliverImageModel);
});

describe("FailDeliveryImageRepository", () => {
  describe("findFailImageByOrderId()", () => {
    beforeAll(async () => {
      const image = new FailDeliverImageModel({ _id: "아이디", image: Buffer.from("1"), reason: "이유" });
      await image.save();
    });

    afterAll(async () => {
      await FailDeliverImageModel.deleteMany();
    });

    test("통과하는 테스트", async () => {
      const orderId = "아이디";
      const result = (await repository.findFailDeliveryImageByOrderId(orderId)).toJSON();

      expect(result).toEqual({
        __v: 0,
        _id: orderId,
        image: { data: [49], type: "Buffer" },
        reason: "이유",
      });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      const orderId = "존재하지 않는 아이디";

      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toThrow();
    });

    test("실패하는 테스트, 알 수 없는 에러 발생", async () => {
      const model = mock<Model<FailDeliveryImage>>();
      const repository = new FailDeliveryImageRepository(model);

      const orderId = "아이디";
      const error = new Error("알 수 없는 에러");

      model.findById.mockRejectedValue(error);

      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toBeInstanceOf(UnknownDataBaseError);
      await expect(repository.findFailDeliveryImageByOrderId(orderId)).rejects.toStrictEqual(
        expect.objectContaining(error),
      );
    });
  });
});
