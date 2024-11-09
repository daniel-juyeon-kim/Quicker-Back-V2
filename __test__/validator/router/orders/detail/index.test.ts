import { NextFunction, Request, Response } from "express";

import { HttpErrorResponse } from "../../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../../validator";
import { getOrdersDetailSchema } from "../../../../../validator/schema/routes/orders/detail/index";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { params: {}, body: {} };
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /orders/:orderIds/detail", () => {
  const testTarget = validate(getOrdersDetailSchema, ["params"]);

  test("통과하는 테스트", async () => {
    req.params = {
      orderIds: "1,2,3,4",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("타입 미스", async () => {
      req.params = {
        orderIds: "a,2,3,4",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "params", msg: mustBe(TYPE.INTEGER_ARRAY), path: "orderIds", type: "field", value: "a,2,3,4" },
        ]),
      );
    });

    test("속성 누락", async () => {
      req.params = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "params", msg: DATA.NOT_EXIST, path: "orderIds", type: "field", value: "" },
          { location: "params", msg: "정수 배열 이어야 합니다.", path: "orderIds", type: "field", value: "" },
        ]),
      );
    });
  });
});
