import { Request as ExpressRequest, NextFunction, Response } from "express";
import { mock } from "jest-mock-extended";
import { Readable } from "stream";
import { OrderCompleteImageController } from "../../../controllers/order/order-complete-image.controller";
import { DuplicatedDataError, NotExistDataError } from "../../../database";
import { OrderCompleteImageService } from "../../../service/order/order-complete-image/order-complete-image.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderCompleteImageControllerRequestData } from "../../../validator/schema/routes/order/order-complete-image-controller.request-data";

const service = mock<OrderCompleteImageService>();
const controller = new OrderCompleteImageController(service);

describe("OrderCompleteImageController", () => {
  type Request = ExpressRequest<OrderCompleteImageControllerRequestData["getCompleteImage"]>;

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    req = {};
    res = { send: jest.fn() };
    next = jest.fn();
  });

  describe("getCompleteImage()", () => {
    test("통과하는 테스트", async () => {
      const params = { orderId: "1" };
      req = { params };

      const buffer = Buffer.from([102, 97, 107, 101, 66, 117]);

      service.findCompleteImageBuffer.mockResolvedValueOnce(buffer);

      await controller.getCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(service.findCompleteImageBuffer).toHaveBeenCalledWith(params.orderId);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, buffer));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 접근", async () => {
      const params = { orderId: "1" };
      req = { params };

      const error = new NotExistDataError("존재하지 않는 데이터");

      service.findCompleteImageBuffer.mockRejectedValueOnce(error);

      await controller.getCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("postCompleteImageBuffer()", () => {
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

    test("통과하는 테스트", async () => {
      const body = { orderId: 1 };
      req = { body };
      req.file = file;

      await controller.postCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(service.createCompleteImage).toHaveBeenCalledWith({ orderId: body.orderId, file });
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 중복 데이터 저장", async () => {
      const body = { orderId: 1 };
      req = { body };
      req.file = file;

      const error = new DuplicatedDataError("중복 데이터");

      service.createCompleteImage.mockRejectedValueOnce(error);

      await controller.postCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
