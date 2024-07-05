import { NextFunction, Request, Response } from "express";
import { message, RequestValidator } from "../../../../../validator";
import { getMethodSchema } from "../../../../../validator/schema/routes/user/name";
import { TestName } from "../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = {};
  next = jest.fn();
});

describe("GET: /user/name", () => {
  const testTarget = RequestValidator.validate(getMethodSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        walletAddress: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.notExist,
        path: "walletAddress",
        type: "field",
        value: undefined,
      });
    });
  });
});
