import { NextFunction, Request, Response } from "express";
import { mock } from "jest-mock-extended";
import { Readable } from "stream";
import { OrderFailImageController } from "../../../controllers/order/fail-image/order-fail-image.controller";
import { DuplicatedDataError, NotExistDataError } from "../../../database";
import { OrderFailImageService } from "../../../service/order/order-fail-image/order-fail-image.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderId } from "../../../validator/schema/routes/params";

const service = mock<OrderFailImageService>();
const controller = new OrderFailImageController(service);

describe("OrderFailImageController", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = {};
    res = { send: jest.fn() };
    next = jest.fn();
  });
  describe("getFailImage()", () => {
    test("통과하는 테스트", async () => {
      const resolvedValue = {
        _id: 1,
        image: Buffer.from([102, 97, 107, 101, 66, 117]),
        reason: "이유",
      } as Awaited<ReturnType<typeof service.findOrderFailImage>>;

      const params = { orderId: "1" };
      req = { params };

      service.findOrderFailImage.mockResolvedValueOnce(resolvedValue);

      await controller.getFailImage(req as Request<OrderId>, res as Response, next as NextFunction);

      expect(service.findOrderFailImage).toHaveBeenCalledWith(params.orderId);
      expect(res.send).toHaveBeenCalledWith(
        new HttpResponse(200, {
          imageBuffer: resolvedValue.image,
          reason: resolvedValue.reason,
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 접근", async () => {
      const params = { orderId: "1" };
      req = { params };

      const error = new NotExistDataError("존재하지 않는 데이터");

      service.findOrderFailImage.mockRejectedValueOnce(error);

      await controller.getFailImage(req as Request<OrderId>, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("postFailImage()", () => {
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

    test("통과하는 테스트", async () => {
      req = {
        file,
        body: {
          orderId,
          reason,
        },
      };

      await controller.postFailImage(req as Request, res as Response, next as NextFunction);

      expect(service.createFailImage).toHaveBeenCalledWith({ file, orderId, reason });
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 중복되는 데이터", async () => {
      req = {
        file,
        body: {
          orderId,
          reason,
        },
      };

      const error = new DuplicatedDataError("데이터 중복");

      service.createFailImage.mockRejectedValueOnce(error);

      await controller.postFailImage(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
