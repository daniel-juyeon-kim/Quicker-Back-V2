import { NextFunction, Request, Response } from "express";
import { getMethodSchema, putMethodSchema } from "../../../../../../validator/schema/routes/user/image/id";
import { Types, message, validate } from "../../../../../../validator";
import { TestName } from "../../../types/test-name";


let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = {};
  next = jest.fn();
});

describe("GET: /user/image/id", () => {
  const testTarget = validate(getMethodSchema, ["query"])

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
    test(TestName.MISS_TYPE, async () => {
      req.query = {
        walletAddress: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: message.mustBe(Types.INT),
        path: "walletAddress",
        type: "field",
        value: "문자열",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

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

describe("PUT: /user/image/id", () => {
  const testTarget = validate(putMethodSchema, ["body"])

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.body = {
        walletAddress: "1",
        imageId: "300",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });
  
  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        walletAddress: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.notExist,
        path: "imageId",
        type: "field",
        value: "",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        walletAddress: "",
        imageId: "300",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.notExist,
        path: "walletAddress",
        type: "field",
        value: "",
      });
    });

    test(TestName.MISS_TYPE, async () => {
      req.body = {
        walletAddress: "0x3o2343i21248",
        imageId: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.mustBe(Types.INT),
        path: "imageId",
        type: "field",
        value: "문자열",
      });
    });
  });
});
