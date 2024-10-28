import { NextFunction, Request, Response } from "express";

import { HttpErrorResponse } from "../../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../../validator";
import { getOrdersDetailSchema } from "../../../../../validator/schema/routes/orders/detail/index";
import { TestName } from "../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /orders/detail", () => {
  const testTarget = validate(getOrdersDetailSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        orderIds: "1,2,3,4",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderIds: "a,2,3,4",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "query", msg: mustBe(TYPE.INTEGER_ARRAY), path: "orderIds", type: "field", value: "a,2,3,4" },
        ]),
      );
    });

    test(TestName.EMPTY_ATTRIBUTE, async () => {
      req.query = {
        walletAddress: "",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "query", msg: DATA.NOT_EXIST, path: "orderIds", type: "field", value: "" },
          { location: "query", msg: "정수 배열 이어야 합니다.", path: "orderIds", type: "field", value: "" },
        ]),
      );
    });
  });
});
