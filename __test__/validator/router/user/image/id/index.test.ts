import { NextFunction, Request, Response } from "express";

import { DATA, mustBe, TYPE, validate, ValidationLayerError } from "../../../../../../validator";
import {
  getUserImageIdSchema,
  updateUserImageIdSchema,
} from "../../../../../../validator/schema/routes/user/user-controller-request-data";

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

  test("통과하는 테스트", async () => {
    req.query = {
      walletAddress: "3f39sl3sef091dfwn",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("속성 누락", async () => {
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

describe("PATCH: /user/image/id", () => {
  const testTarget = validate(updateUserImageIdSchema, ["body"]);

  test("통과하는 테스트", async () => {
    req.body = {
      walletAddress: "3f39sl3sef091dfwn",
      imageId: "300",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("속성 누락", async () => {
      req.body = {
        walletAddress: "3f39sl3sef091dfwn",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(
        new ValidationLayerError([
          { location: "body", msg: DATA.NOT_EXIST, path: "imageId", type: "field", value: "" },
          { location: "body", msg: "정수 이어야 합니다.", path: "imageId", type: "field", value: "" },
        ]),
      );
    });

    test("빈 문자열", async () => {
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

    test("올바르지 않은 타입", async () => {
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
