import { NextFunction, Request, Response } from "express";
import { message, RequestValidator, Types } from "../../../../validator";
import { getMethodSchema } from "../../../../validator/schema/routes/room";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = {};
  next = jest.fn();
});

describe("GET: /room", () => {
  const testTarget = RequestValidator.validate(getMethodSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        orderNum: "3",
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
        msg: message.notExist,
        path: "orderNum",
        type: "field",
        value: undefined,
      });
    });

    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderNum: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.mustBe(Types.INT),
        path: "orderNum",
        type: "field",
        value: "문자열",
      });
    });
  });
});
