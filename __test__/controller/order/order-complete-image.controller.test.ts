import { NextFunction, Request, Response } from "express";
import { mock } from "jest-mock-extended";
import { OrderCompleteImageController } from "../../../controllers/order/order-complete-image.controller";
import { NotExistDataError } from "../../../database";
import { OrderCompleteImageService } from "../../../service/order/order-complete-image/order-complete-image.service";
import { HttpResponse } from "../../../util/http-response";

const service = mock<OrderCompleteImageService>();
const controller = new OrderCompleteImageController(service);

describe("OrderCompleteImageController", () => {
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
      const query = { orderId: "1" };
      req = { query };

      const buffer = Buffer.from([102, 97, 107, 101, 66, 117]);

      service.findCompleteImageBuffer.mockResolvedValueOnce(buffer);

      await controller.getCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(service.findCompleteImageBuffer).toHaveBeenCalledWith(query.orderId);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, buffer));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 접근", async () => {
      const query = { orderId: "1" };
      req.query = query;

      const error = new NotExistDataError("존재하지 않는 데이터");

      service.findCompleteImageBuffer.mockRejectedValueOnce(error);

      await controller.getCompleteImageBuffer(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
