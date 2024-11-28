import { mock } from "jest-mock-extended";
import { Readable } from "stream";
import { CompleteDeliveryImageRepository } from "../../../database";
import { OrderCompleteImageService } from "../../../service/order/order-complete-image/order-complete-image.service";

const repository = mock<CompleteDeliveryImageRepository>();
const service = new OrderCompleteImageService(repository);

describe("OrderCompleteImageService", () => {
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

  test("findCompleteImage()", async () => {
    const orderId = "1";

    repository.findCompleteImageBufferByOrderId.mockResolvedValueOnce(file.buffer);

    await expect(service.findCompleteImageBuffer(orderId)).resolves.toEqual(file.buffer);
  });

  test("createCompleteImageBuffer()", async () => {
    const orderId = 1;

    await service.createCompleteImage({ orderId, file });

    expect(repository.create).toHaveBeenCalledWith({ orderId, bufferImage: file.buffer });
  });
});
