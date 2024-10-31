import { NextFunction, Request, Response } from "express";

import { HttpErrorResponse } from "../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../validator";
import {
  getOrderFailImageSchema,
  postOrderFailImageSchema,
} from "../../../../validator/schema/routes/order/order-fail-image-controller-request-data";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /order/fail-image", () => {
  const testTarget = validate(getOrderFailImageSchema, ["query"]);

  test("통과하는 테스트", async () => {
    req.query = {
      orderId: "1",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("타입 미스", async () => {
      req.query = {
        orderId: "1d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
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

    test("필요 속성 누락", async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "query",
            msg: DATA.NOT_EXIST,
            path: "orderId",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });
  });
});

describe("POST: /order/fail-image", () => {
  const testTarget = validate(postOrderFailImageSchema, ["body"]);

  test("통과하는 테스트", async () => {
    req.body = {
      orderId: 1,
      reason: "사유",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("타입미스", async () => {
      req.body = {
        orderId: "1",
        reason: "",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: "데이터가 존재하지 않습니다.",
            path: "reason",
            type: "field",
            value: "",
          },
          {
            location: "body",
            msg: "정수 이어야 합니다.",
            path: "orderId",
            type: "field",
            value: "1",
          },
        ]),
      );
    });

    test("속성 누락", async () => {
      req.body = {
        orderId: 1,
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: DATA.NOT_EXIST,
            path: "reason",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });
  });
});
