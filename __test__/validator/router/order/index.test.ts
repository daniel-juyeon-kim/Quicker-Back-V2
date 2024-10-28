import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../validator";
import { getOrderSchema } from "../../../../validator/schema/routes/order/order-controller-request-data";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

describe("GET: /order", () => {
  beforeEach(() => {
    req = { query: {}, body: {} };
    res = { send: jest.fn() };
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

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
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
