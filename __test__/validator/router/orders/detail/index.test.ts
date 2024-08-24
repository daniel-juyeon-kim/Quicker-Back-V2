import { NextFunction, Request, Response } from "express";

import { ExpectType, validate, ValidateErrorMessage } from "../../../../../validator";
import { getOrdersDetailSchema } from "../../../../../validator/schema/routes/orders/detail/index";
import { TestName } from "../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
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

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT_ARRAY),
        path: "orderIds",
        type: "field",
        value: "a,2,3,4",
      });
    });

    test(TestName.EMPTY_ATTRIBUTE, async () => {
      req.query = {
        walletAddress: "",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.notExist,
        path: "orderIds",
        type: "field",
        value: "",
      });
    });
  });
});
