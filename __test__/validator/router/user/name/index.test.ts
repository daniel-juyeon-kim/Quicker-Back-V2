import { NextFunction, Request, Response } from "express";
import { RequestValidator, ValidateErrorMessage } from "../../../../../validator";
import { getUserNameSchema } from "../../../../../validator/schema/routes/user";
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
  const testTarget = RequestValidator.validate(getUserNameSchema, ["query"]);

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
        msg: ValidateErrorMessage.notExist,
        path: "walletAddress",
        type: "field",
        value: undefined,
      });
    });
  });
});
