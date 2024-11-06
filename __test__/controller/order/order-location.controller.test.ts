import { NextFunction, Request, Response } from "express";
import { mock } from "jest-mock-extended";
import { OrderLocationController } from "../../../controllers/order/location/order-location.controller";
import { NotExistDataError } from "../../../database";
import { OrderLocationService } from "../../../service/order/location/order-location.service";
import { HttpResponse } from "../../../util/http-response";

const service = mock<OrderLocationService>();

const controller = new OrderLocationController(service);

let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("OrderLocationControllerImpl", () => {
  describe("getCoordinates()", () => {
    test("통과하는 테스트", async () => {
      const params = { orderId: "1" };
      req.params = params;

      const responseData = {
        id: 1,
        departure: { x: 126.977, y: 37.5665 },
        destination: { x: 129.0756, y: 35.1796 },
      };
      service.findDepartureAndDestination.mockResolvedValueOnce(responseData);

      await controller.getCoordinates(req as Request, res as Response, next as NextFunction);

      expect(service.findDepartureAndDestination).toHaveBeenCalledWith(params.orderId);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, responseData));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 데이터가 존재하지 않아 예외 발생", async () => {
      const params = { orderId: "1" };
      req.params = params;

      const error = new NotExistDataError("존재하지 않는 데이터");
      service.findDepartureAndDestination.mockRejectedValueOnce(error);

      await controller.getCoordinates(req as Request, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
