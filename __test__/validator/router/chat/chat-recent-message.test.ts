import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { mustBe, TYPE, validate } from "../../../../validator";
import { getChatRecentMessageSchema } from "../../../../validator/schema/routes/chat/chat-controller-request-data";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /chat/{roomId}/recent-message", () => {
  const testTarget = validate(getChatRecentMessageSchema, ["params"]);

  test("통과하는 테스트", async () => {
    req.params = {
      roomId: "3",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("속성누락", async () => {
      req.params = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "params",
            msg: "데이터가 존재하지 않습니다.",
            path: "roomId",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });

    test("타입 미스", async () => {
      req.params = {
        roomId: "문자열",
      };

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "params", msg: mustBe(TYPE.INTEGER), path: "roomId", type: "field", value: "문자열" },
        ]),
      );
    });
  });
});
