import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { validate } from "../../../../validator";
import { getAverageCostSchema } from "../../../../validator/schema/routes/average";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /orders/average/cost/latest", () => {
  const validateFn = validate(getAverageCostSchema, ["query"]);

  test("통과하는 테스트", async () => {
    req.query = {
      distance: "42",
    };

    await validateFn(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("타입 미스, 문자열 음수", async () => {
      req.query = {
        distance: "-1",
      };

      await validateFn(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "query",
            msg: "양수 이어야 합니다.",
            path: "distance",
            type: "field",
            value: "-1",
          },
        ]),
      );
    });

    test("타입 미스, 문자열 타입 숫자가 아닌 일반 문자열", async () => {
      req.query = {
        distance: "42d",
      };

      await validateFn(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "query",
            msg: "양수 이어야 합니다.",
            path: "distance",
            type: "field",
            value: "42d",
          },
        ]),
      );
    });
  });
});
