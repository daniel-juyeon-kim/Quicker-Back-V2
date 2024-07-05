import { NextFunction, Request, Response } from "express";
import { message, RequestValidator } from "../../../../validator";
import { getMethodSchema } from "../../../../validator/schema/routes/orders";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
  next = jest.fn();
});

describe("GET: /orders", () => {
  const testTarget = RequestValidator.validate(getMethodSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        walletAddress: "0xhfo38291uh3r229217",
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
        path: "walletAddress",
        type: "field",
        value: "",
      });
    });

    test(TestName.EMPTY_ATTRIBUTE, async () => {
      req.query = {
        walletAddress: "",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.notExist,
        path: "walletAddress",
        type: "field",
        value: "",
      });
    });
  });
});
