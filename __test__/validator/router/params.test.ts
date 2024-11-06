import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../util/http-response";
import { validate } from "../../../validator";
import { orderIdParamSchema } from "../../../validator/schema/routes/params";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("param 스키마 검증 테스트", () => {
  describe("orderIdParamSchema", () => {
    const validateMiddleware = validate(orderIdParamSchema, ["params"]);
    test("통과하는 테스트", async () => {
      const params = { orderId: "1" };
      req = {
        params,
      };

      await validateMiddleware(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith();
      expect(res.send).not.toHaveBeenCalled();
    });

    describe("실패하는 테스트", () => {
      test("타입 미스", async () => {
        const params = { orderId: "1d" };
        req = {
          params,
        };

        await validateMiddleware(req as Request, res as Response, next as NextFunction);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(
          new HttpErrorResponse(400, [
            {
              location: "params",
              msg: "정수 이어야 합니다.",
              path: "orderId",
              type: "field",
              value: "1d",
            },
          ]),
        );
      });

      test("속성 누락", async () => {
        req = {};

        await validateMiddleware(req as Request, res as Response, next as NextFunction);

        expect(next).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith(
          new HttpErrorResponse(400, [
            {
              location: "params",
              msg: "데이터가 존재하지 않습니다.",
              path: "orderId",
              type: "field",
              value: undefined,
            },
          ]),
        );
      });
    });
  });
});
