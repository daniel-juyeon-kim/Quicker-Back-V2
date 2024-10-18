import { NextFunction, Request, Response } from "express";

import { DATA, mustBe, TYPE, validate, ValidationLayerError } from "../../../../../../validator";
import { getUserImageIdSchema, putUserImageIdSchema } from "../../../../../../validator/schema/routes/user";
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
  const testTarget = validate(getUserImageIdSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        walletAddress: "3f39sl3sef091dfwn",
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

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          { location: "query", msg: DATA.NOT_EXIST, path: "walletAddress", type: "field", value: undefined },
          { location: "query", msg: "문자열 이어야 합니다.", path: "walletAddress", type: "field", value: undefined },
        ]),
      );
    });
  });
});

describe("PUT: /user/image/id", () => {
  const testTarget = validate(putUserImageIdSchema, ["body"]);

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

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          { location: "body", msg: DATA.NOT_EXIST, path: "imageId", type: "field", value: "" },
          { location: "body", msg: "정수 이어야 합니다.", path: "imageId", type: "field", value: "" },
        ]),
      );
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        walletAddress: "",
        imageId: "300",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          {
            location: "body",
            msg: DATA.NOT_EXIST,
            path: "walletAddress",
            type: "field",
            value: "",
          },
        ]),
      );
    });

    test(TestName.MISS_TYPE, async () => {
      req.body = {
        walletAddress: "0x3o2343i21248",
        imageId: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          { location: "body", msg: mustBe(TYPE.INTEGER), path: "imageId", type: "field", value: "문자열" },
        ]),
      );
    });
  });
});
