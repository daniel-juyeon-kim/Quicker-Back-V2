import { NextFunction, Request, Response } from "express";

import { DATA, mustBe, TYPE, validate, ValidationLayerError } from "../../../../../../validator";
import {
  getOrderImageFailSchema,
  postOrderImageFailSchema,
} from "../../../../../../validator/schema/routes/order/image/fail";
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
  const testTarget = validate(getOrderImageFailSchema, ["query"]);

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

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError({
          location: "query",
          msg: mustBe(TYPE.INTEGER),
          path: "orderId",
          type: "field",
          value: "1d",
        }),
      );
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError({
          location: "query",
          msg: DATA.NOT_EXIST,
          path: "orderId",
          type: "field",
          value: "",
        }),
      );
    });
  });
});

describe("POST: /order/image/fail", () => {
  const testTarget = validate(postOrderImageFailSchema, ["body"]);

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

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError({
          location: "body",
          msg: DATA.NOT_EXIST,
          path: "reason",
          type: "field",
          value: "",
        }),
      );
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        orderNum: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError({
          location: "body",
          msg: DATA.NOT_EXIST,
          path: "reason",
          type: "field",
          value: "",
        }),
      );
    });
  });
});
