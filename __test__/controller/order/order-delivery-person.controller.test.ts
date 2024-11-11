import { NextFunction, Request, Response } from "express-serve-static-core";
import { mock, mockClear } from "jest-mock-extended";
import { OrderDeliveryPersonController } from "../../../controllers/order/order-delivery-person.controller";
import { NotExistDataError } from "../../../database";
import { DeliveryPersonService } from "../../../service/order/delivery-person/delivery-person.service";
import { HttpResponse } from "../../../util/http-response";

const service = mock<DeliveryPersonService>();
const controller = new OrderDeliveryPersonController(service);

let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

beforeEach(() => {
  mockClear(service);
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("OrderDeliveryPersonController", () => {
  describe("getDeliveryPersonCurrentLocation()", () => {
    test("통과하는 테스트", async () => {
      const orderId = "1";
      req.params = { orderId };

      const resolveValue = { x: 126.73, y: 37.71 };
      service.findCurrentLocation.mockResolvedValueOnce(resolveValue);

      await controller.getDeliveryPersonCurrentLocation(req as Request, res as Response, next as NextFunction);

      expect(service.findCurrentLocation).toHaveBeenCalledWith(orderId);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, resolveValue));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 ", async () => {
      const orderId = "1";
      req.params = { orderId };

      const error = new NotExistDataError("데이터가 존재하지 않습니다.");
      service.findCurrentLocation.mockRejectedValueOnce(error);

      await controller.getDeliveryPersonCurrentLocation(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
