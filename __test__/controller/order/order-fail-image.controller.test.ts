import { NextFunction, Request, Response } from "express";
import { mock } from "jest-mock-extended";
import { OrderFailImageController } from "../../../controllers/order/fail-image/order-fail-image.controller";
import { NotExistDataError } from "../../../database";
import { OrderFailImageService } from "../../../service/order/order-fail-image/order-fail-image.service";
import { HttpResponse } from "../../../util/http-response";

const service = mock<OrderFailImageService>();
const controller = new OrderFailImageController(service);

describe("OrderFailImageController", () => {
  describe("getFailImage()", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: Partial<NextFunction>;

    beforeEach(() => {
      req = {};
      res = { send: jest.fn() };
      next = jest.fn();
    });

    test("통과하는 테스트", async () => {
      const query = { orderId: "1" };
      req.query = query;

      const resolvedValue = {
        _id: "1",
        image: Buffer.from([102, 97, 107, 101, 66, 117]),
        reason: "이유",
      } as Awaited<ReturnType<typeof service.findOrderFailImage>>;

      service.findOrderFailImage.mockResolvedValueOnce(resolvedValue);

      await controller.getFailImage(req as Request, res as Response, next as NextFunction);

      expect(service.findOrderFailImage).toHaveBeenCalledWith(query.orderId);
      expect(res.send).toHaveBeenCalledWith(
        new HttpResponse(200, {
          imageBuffer: resolvedValue.image,
          reason: resolvedValue.reason,
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 접근", async () => {
      const query = { orderId: "1" };
      req.query = query;

      const error = new NotExistDataError("존재하지 않는 데이터");

      service.findOrderFailImage.mockRejectedValueOnce(error);

      await controller.getFailImage(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
