import { NextFunction, Request, Response } from "express";
import { DATA, validate, ValidationLayerError } from "../../../../../validator";
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
  const testTarget = validate(getUserNameSchema, ["query"]);

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
      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          { location: "query", msg: DATA.NOT_EXIST, path: "walletAddress", type: "field", value: undefined },
          { location: "query", msg: "문자열 이어야 합니다.", path: "walletAddress", type: "field", value: undefined },
        ]),
      );
    });
  });
});
