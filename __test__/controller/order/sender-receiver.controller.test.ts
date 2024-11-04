import { NextFunction, Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import { OrderSenderReceiverController } from "../../../controllers/order/order-sender-receiver.controller";
import { Order } from "../../../database";
import { SenderReceiverService } from "../../../service/order/sender-receiver/sender-receiver.service";
import { HttpResponse } from "../../../util/http-response";

const service = mock<SenderReceiverService>();
const controller = new OrderSenderReceiverController(service);

let req: Partial<Request>;
let res: Partial<Response>;
let next: Partial<NextFunction>;

beforeEach(() => {
  mockClear(service);
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("SenderReceiverController", () => {
  test("getSenderReceiverInfo()", async () => {
    req.params = { orderId: "1" };

    const resolveValue = {
      id: 1,
      departure: {
        id: 101,
        x: 127.123456,
        y: 37.123456,
        sender: {
          phone: "010-1234-5678",
        },
      },
      destination: {
        id: 102,
        x: 126.987654,
        y: 36.987654,
        receiver: {
          phone: "010-8765-4321",
        },
      },
    };

    service.findSenderReceiverInfo.mockResolvedValueOnce(resolveValue as Order);
    await controller.getSenderReceiverInfo(req as Request, res as Response, next as NextFunction);

    expect(res.send).toHaveBeenCalledWith(new HttpResponse(200, resolveValue));
  });
});
