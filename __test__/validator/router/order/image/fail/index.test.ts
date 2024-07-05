import { NextFunction, Request, Response } from "express";

import { message, RequestValidator, Types } from "../../../../../../validator";
import { getMethodSchema, postMethodSchema } from "../../../../../../validator/schema/routes/order/image/fail";
import { TestName } from "../../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
  next = jest.fn();
});

describe("GET: /order/image/fail", () => {
  const testTarget = RequestValidator.validate(getMethodSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        orderId: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderId: "1d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.mustBe(Types.INT),
        path: "orderId",
        type: "field",
        value: "1d",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.notExist,
        path: "orderId",
        type: "field",
        value: "",
      });
    });
  });
});

describe("POST: /order/image/fail", () => {
  const testTarget = RequestValidator.validate(postMethodSchema, ["body"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.body = {
        orderNum: "1",
        reason: "사유",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.body = {
        orderNum: "1",
        reason: "",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.notExist,
        path: "reason",
        type: "field",
        value: "",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        orderNum: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.notExist,
        path: "reason",
        type: "field",
        value: "",
      });
    });
  });
});
