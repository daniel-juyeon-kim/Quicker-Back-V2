import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../../util/http-response";
import { DATA, validate } from "../../../../../validator";
import { getUserNameSchema } from "../../../../../validator/schema/routes/user/user-controller-request-data";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("GET: /user/name", () => {
  const testTarget = validate(getUserNameSchema, ["query"]);

  test("통과하는 테스트", async () => {
    req.query = {
      walletAddress: "1",
    };

    await testTarget(req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledTimes(0);
    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("속성 누락", async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          { location: "query", msg: DATA.NOT_EXIST, path: "walletAddress", type: "field", value: undefined },
          { location: "query", msg: "문자열 이어야 합니다.", path: "walletAddress", type: "field", value: undefined },
        ]),
      );
    });
  });
});
