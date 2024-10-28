import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../validator";
import { getAverageCostSchema } from "../../../../validator/schema/routes/average-cost";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /average-cost", () => {
  const testTarget = validate(getAverageCostSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        distance: "42",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "query",
            msg: DATA.NOT_EXIST,
            path: "distance",
            type: "field",
            value: "",
          },
          {
            location: "query",
            msg: "정수 이어야 합니다.",
            path: "distance",
            type: "field",
            value: "",
          },
        ]),
      );
    });

    test(TestName.MISS_TYPE, async () => {
      req.query = {
        distance: "42d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "query",
            msg: mustBe(TYPE.INTEGER),
            path: "distance",
            type: "field",
            value: "42d",
          },
        ]),
      );
    });
  });
});
