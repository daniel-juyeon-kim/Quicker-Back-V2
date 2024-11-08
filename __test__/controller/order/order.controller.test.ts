import { error } from "console";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { mock, mockClear } from "jest-mock-extended";
import { OrderController } from "../../../controllers/order/order.controller";
import { UnknownDataBaseError } from "../../../core";
import { NotExistDataError, Order } from "../../../database";
import { OrderService } from "../../../service/order/order.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderControllerRequestData } from "../../../validator/schema/routes/order/order-controller-request-data";
import { OrderIdParam } from "../../../validator/schema/routes/params";
import { WalletAddressQuery } from "../../../validator/schema/routes/query";

const service = mock<OrderService>();
const controller = new OrderController(service);

let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

beforeEach(() => {
  mockClear(service);
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("OrderController", () => {
  describe("createOrder()", () => {
    const body: Parameters<OrderService["createOrder"]>[0] = {
      walletAddress: "0x123456789abcdef",
      detail: "Fragile, handle with care",
      transportation: ["bicycle", "truck"],
      product: {
        width: 20,
        length: 30,
        height: 40,
        weight: 10,
      },
      destination: {
        x: 37.7749,
        y: -122.4194,
      },
      departure: {
        x: 34.0522,
        y: -118.2437,
      },
      sender: {
        name: "John Doe",
        phone: "123-456-7890",
      },
      receiver: {
        name: "Jane Smith",
        phone: "987-654-3210",
      },
    };

    test("통과하는 테스트", async () => {
      req = { body };

      await controller.createOrder(req as Request, res as Response, next as NextFunction);

      expect(service.createOrder).toHaveBeenCalledWith(body);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200));
      expect(next).not.toHaveBeenCalledWith(error);
    });

    test("실패하는 테스트, 알 수 없는 DB 에러 헨들링", async () => {
      req = { body };

      const error = new UnknownDataBaseError("알 수 없는 DB 에러");
      service.createOrder.mockRejectedValue(error);

      await controller.createOrder(req as Request, res as Response, next as NextFunction);

      expect(service.createOrder).toHaveBeenCalledWith(body);
      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });

    test("실패하는 테스트, 존재하지 않는 데이터 에러", async () => {
      req = { body };

      const error = new NotExistDataError("존재하지 않는 데이터");

      service.createOrder.mockRejectedValue(error);

      await controller.createOrder(req as Request, res as Response, next as NextFunction);

      expect(service.createOrder).toHaveBeenCalledWith(body);
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

  describe("getMatchableOrdersByWalletAddress()", () => {
    let request: Partial<Request<never, never, never, WalletAddressQuery>>;

    beforeEach(() => {
      request = {};
    });

    test("통과하는 테스트", async () => {
      const walletAddress = "배송원 지갑주소";

      request.query = { walletAddress };

      const resolveValue = [
        {
          id: 1,
          departure: { detail: "디테일", x: 0, y: 0 },
          destination: { detail: "디테일", x: 37.5, y: 112 },
          detail: "디테일",
          product: { height: 0, length: 0, weight: 0, width: 0 },
          transportation: { bicycle: 0, bike: 0, car: 0, scooter: 0, truck: 0, walking: 0 },
        },
      ];

      service.findAllMatchableOrder.mockResolvedValueOnce(resolveValue as Order[]);

      await controller.getMatchableOrdersByWalletAddress(
        request as Request<never, never, never, WalletAddressQuery>,
        res as Response,
        next as NextFunction,
      );

      expect(service.findAllMatchableOrder).toHaveBeenCalledWith(walletAddress);
      expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, resolveValue));
      expect(next).not.toHaveBeenCalled();
    });

    test("실패하는 테스트, next 호출", async () => {
      const walletAddress = "배송원 지갑주소";

      request.query = { walletAddress };

      const error = new NotExistDataError("회원이 존재하지 않습니다.");
      service.findAllMatchableOrder.mockRejectedValueOnce(error);

      await controller.getMatchableOrdersByWalletAddress(
        request as Request<never, never, never, WalletAddressQuery>,
        res as Response,
        next as NextFunction,
      );

      expect(res.send).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // test("should have a method getFailImage()", async () => {
  //   // await controller.getFailImage(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method postFailImage()", async () => {
  //   // await controller.postFailImage(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method getImage()", async () => {
  //   // await controller.getImage(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method postImage()", async () => {
  //   // await controller.postImage(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method orderlist()", async () => {
  //   // await controller.orderlist(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method getRoomInfo()", async () => {
  //   // await controller.getRoomInfo(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method postLocation()", async () => {
  //   // await controller.postLocation(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method getLocation()", async () => {
  //   // await controller.getLocation(req,res,next);
  //   expect(false).toBeTruthy();
  // });

  // test("should have a method getAverageCost()", async () => {
  //   // await controller.getAverageCost(req,res,next);
  //   expect(false).toBeTruthy();
  // });
});
