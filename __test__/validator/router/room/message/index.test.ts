import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../../validator";
import { getRoomMessageSchema } from "../../../../../validator/schema/routes/chat-room/chat-room-controller-request-data";
import { TestName } from "../../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /room/ValidateErrorMessage", () => {
  const testTarget = validate(getRoomMessageSchema, ["query"]);

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

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "query", msg: DATA.NOT_EXIST, path: "orderNum", type: "field", value: undefined },
          { location: "query", msg: "정수 이어야 합니다.", path: "orderNum", type: "field", value: undefined },
        ]),
      );
    });

    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderNum: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "query", msg: mustBe(TYPE.INTEGER), path: "orderNum", type: "field", value: "문자열" },
        ]),
      );
    });
  });
});
