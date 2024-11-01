import { NextFunction, Request, Response } from "express";

import { HttpErrorResponse } from "../../../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../../../validator";
import { postOrderImageCompleteSchema } from "../../../../../../validator/schema/routes/order/image/complete";
import { TestName } from "../../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = { send: jest.fn() };
  next = jest.fn();
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

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: mustBe(TYPE.INTEGER),
            path: "orderNum",
            type: "field",
            value: "1d",
          },
        ]),
      );
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: DATA.NOT_EXIST,
            path: "orderNum",
            type: "field",
            value: undefined,
          },
          {
            location: "body",
            msg: "정수 이어야 합니다.",
            path: "orderNum",
            type: "field",
            value: undefined,
          },
          {
            location: "body",
            msg: "정수 이어야 합니다.",
            path: "orderNum",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });
  });
});
