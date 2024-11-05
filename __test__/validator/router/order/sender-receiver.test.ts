import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { mustBe, TYPE, validate } from "../../../../validator";
import { getSenderReceiverInfoSchema } from "../../../../validator/schema/routes/order/order-sender-receiver-controller-request-data";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /order/sender-receiver-info/{orderId}", () => {
  const testTarget = validate(getSenderReceiverInfoSchema, ["params"]);

  test("통과하는 테스트", async () => {
    req.params = {
      orderId: "3",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("속성 누락", async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "params",
            msg: "데이터가 존재하지 않습니다.",
            path: "orderId",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });

    test("타입 미스", async () => {
      req.params = {
        orderId: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "params", msg: mustBe(TYPE.INTEGER), path: "orderId", type: "field", value: "문자열" },
        ]),
      );
    });
  });
});
