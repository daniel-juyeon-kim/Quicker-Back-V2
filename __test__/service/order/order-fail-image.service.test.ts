import { mock, mockClear } from "jest-mock-extended";
import { Readable } from "stream";
import { FailDeliveryImageRepository } from "../../../database";
import { OrderFailImageService } from "../../../service/order/order-fail-image/order-fail-image.service";

const repository = mock<FailDeliveryImageRepository>();
const service = new OrderFailImageService(repository);

beforeEach(() => {
  mockClear(repository);
});

describe("OrderFailImageService", () => {
  test("createFailImage()", async () => {
    const file = {
      fieldname: "uploadedFile",
      originalname: "example.png",
      encoding: "7bit",
      mimetype: "image/png",
      size: 1024,
      stream: new Readable(),
      destination: "/uploads",
      filename: "example-1234.png",
      path: "/uploads/example-1234.png",
      buffer: Buffer.from("file content"),
    };
    const orderId = 1;
    const reason = "이유";

    await service.createFailImage({ file, orderId, reason });

    expect(repository.createFailDeliveryImage).toHaveBeenCalledWith({ orderId, reason, bufferImage: file.buffer });
  });
});
