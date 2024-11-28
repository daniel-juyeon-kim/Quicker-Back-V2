import { NextFunction, Request, Response } from "express-serve-static-core";
import { mock, mockClear } from "jest-mock-extended";
import { OrderDeliveryPersonController } from "../../../controllers/order/order-delivery-person.controller";
import { NotExistDataError } from "../../../database";
import { DeliveryPersonService } from "../../../service/order/delivery-person/delivery-person.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderControllerRequestData } from "../../../validator/schema/routes/order/order-controller-request-data";
import { OrderDeliveryPersonControllerRequestData } from "../../../validator/schema/routes/order/order-delivery-person-controller-request-data";
import { OrderIdParam } from "../../../validator/schema/routes/params";

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

  describe("getDeliveryPersonCurrentLocation()", () => {
    type RequestType = Request<
      never,
      never,
      OrderDeliveryPersonControllerRequestData["postDeliveryPersonCurrentLocation"]
    >;
    let request: Partial<RequestType>;

    beforeEach(() => {
      request = {};
    });

    test("통과하는 테스트", async () => {
      const body = {
        x: 126.73,
        y: 37.71,
        orderId: 1,
      };
      request = { body };

      await controller.postDeliveryPersonCurrentLocation(request as RequestType, res as Response, next as NextFunction);

      expect(service.createDeliveryPersonCurrentLocation).toHaveBeenCalledWith(body);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, 존재하지 않는 데이터 ", async () => {
      const body = {
        x: 126.73,
        y: 37.71,
        orderId: 1,
      };
      request = { body };

      const error = new NotExistDataError("데이터가 존재하지 않습니다.");
      service.createDeliveryPersonCurrentLocation.mockRejectedValueOnce(error);

      await controller.postDeliveryPersonCurrentLocation(request as RequestType, res as Response, next as NextFunction);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("updateOrderDeliveryPerson()", () => {
    const body: OrderControllerRequestData["updateOrderDeliveryPerson"] = {
      walletAddress: "지갑주소",
    };
    const params = {
      orderId: "1",
    };

    test("통과하는 테스트", async () => {
      req = { body, params };

      await controller.updateOrderDeliveryPerson(req as Request<OrderIdParam>, res as Response, next as NextFunction);

      expect(service.matchDeliveryPersonAtOrder).toHaveBeenCalledWith({
        orderId: params.orderId,
        walletAddress: body.walletAddress,
      });
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
      expect(next).not.toHaveBeenCalledWith();
    });

    test("실패하는 테스트, next 호출", async () => {
      req = { body, params };

      const error = new NotExistDataError("존제하지 않는 데이터");

      service.matchDeliveryPersonAtOrder.mockRejectedValueOnce(error);

      await controller.updateOrderDeliveryPerson(req as Request<OrderIdParam>, res as Response, next as NextFunction);

      expect(service.matchDeliveryPersonAtOrder).toHaveBeenCalledWith({
        orderId: params.orderId,
        walletAddress: body.walletAddress,
      });
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
