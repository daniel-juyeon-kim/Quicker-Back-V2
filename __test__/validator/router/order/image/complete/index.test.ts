import { NextFunction, Request, Response } from "express";

import { ExpectType, validate, ValidateErrorMessage } from "../../../../../../validator";
import {
  getOrderImageCompleteSchema,
  postOrderImageCompleteSchema,
} from "../../../../../../validator/schema/routes/order/image/complete";
import { TestName } from "../../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
  next = jest.fn();
});

describe("GET: /order/image/complete", () => {
  const testTarget = validate(getOrderImageCompleteSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        orderNum: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderNum: "1d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "orderNum",
        type: "field",
        value: "1d",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.notExist,
        path: "orderNum",
        type: "field",
        value: undefined,
      });
    });
  });
});

describe("POST: /order/image/complete", () => {
  const testTarget = validate(postOrderImageCompleteSchema, ["body"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.body = {
        orderNum: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.body = {
        orderNum: "1d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "orderNum",
        type: "field",
        value: "1d",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.notExist,
        path: "orderNum",
        type: "field",
        value: undefined,
      });
    });
  });
});
