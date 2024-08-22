import { NextFunction, Request, Response } from "express";
import { ExpectType, RequestValidator, ValidateErrorMessage } from "../../../../validator";
import { getAverageCostSchema } from "../../../../validator/schema/routes/average-cost";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = {};
  next = jest.fn();
});

describe("GET: /average-cost", () => {
  const testTarget = RequestValidator.validate(getAverageCostSchema, ["query"]);

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

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.notExist,
        path: "distance",
        type: "field",
        value: "",
      });
    });

    test(TestName.MISS_TYPE, async () => {
      req.query = {
        distance: "42d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "distance",
        type: "field",
        value: "42d",
      });
    });
  });
});
