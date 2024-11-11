import { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { DATA, mustBe, TYPE, validate } from "../../../../validator";
import { postDeliveryPersonCurrentLocationSchema } from "../../../../validator/schema/routes/current-deliver-location";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("POST: /orders/delivery-person/location", () => {
  const validateFn = validate(postDeliveryPersonCurrentLocationSchema, ["body"]);

  test("통과하는 테스트", async () => {
    req.body = {
      x: 127,
      y: 37,
      orderId: 1,
    };

    await validateFn(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe("실패하는 테스트", () => {
    test("타입 미스", async () => {
      req.body = {
        x: 127,
        y: "37",
        orderId: 1,
      };

      await validateFn(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: mustBe(TYPE.INTEGER),
            path: "y",
            type: "field",
            value: "37",
          },
        ]),
      );
    });

    test("속성 누락", async () => {
      req.body = {
        x: 127,
        y: 37,
      };

      await validateFn(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: DATA.NOT_EXIST,
            path: "orderId",
            type: "field",
            value: undefined,
          },
        ]),
      );
    });
  });
});
