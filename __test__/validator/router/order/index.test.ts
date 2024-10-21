import { NextFunction, Request, Response } from "express";
import { DATA, mustBe, TYPE, validate, ValidationLayerError } from "../../../../validator";
import {
  getOrderSchema,
  patchOrderSchema,
} from "../../../../validator/schema/routes/order/order-controller-request-data";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

describe("GET: /order", () => {
  beforeEach(() => {
    req = { query: {}, body: {} };
    res = {};
    next = jest.fn();
  });

  const testTarget = validate(getOrderSchema, ["query"]);

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
        new ValidationLayerError([
          {
            location: "query",
            msg: mustBe(TYPE.INTEGER),
            path: "orderId",
            type: "field",
            value: "1d",
          },
        ]),
      );
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          {
            location: "query",
            msg: DATA.NOT_EXIST,
            path: "orderId",
            type: "field",
            value: "",
          },
          {
            location: "query",
            msg: "정수 이어야 합니다.",
            path: "orderId",
            type: "field",
            value: "",
          },
        ]),
      );
    });
  });
});

describe("PATCH: /order", () => {
  beforeEach(() => {
    req = {
      body: {
        userWalletAddress: "0xe829h129k480dflj289308",
        orderId: 1,
      },
    };
    res = {};
    next = jest.fn();
  });

  const testTarget = validate(patchOrderSchema, ["body"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.FAIL, async () => {
      req.body.orderId = "3e4";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          {
            location: "body",
            msg: mustBe(TYPE.INTEGER),
            path: "orderId",
            type: "field",
            value: "3e4",
          },
          {
            location: "body",
            msg: "정수 이어야 합니다.",
            path: "orderId",
            type: "field",
            value: "3e4",
          },
        ]),
      );
    });

    test(TestName.FAIL, async () => {
      req.body.orderId = "3";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          {
            location: "body",
            msg: mustBe(TYPE.INTEGER),
            path: "orderId",
            type: "field",
            value: "3",
          },
        ]),
      );
    });
  });
});
