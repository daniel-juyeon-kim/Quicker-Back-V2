import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../validator";
import { getOrderCompleteImageSchema } from "../../../../validator/schema/routes/order/image/complete";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /order/complete-image", () => {
  const testTarget = validate(getOrderCompleteImageSchema, ["query"]);

  test("통과하는 테스트", async () => {
    req.query = {
      orderId: "1",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("문자열 타입의 정수가 아님", async () => {
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

    test("속성 누락", async () => {
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
