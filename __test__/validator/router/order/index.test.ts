import { NextFunction, Request, Response } from "express";
import { ExpectType, validate, ValidateErrorMessage } from "../../../../validator";
import { getOrderSchema, patchOrderSchema, postOrderSchema } from "../../../../validator/schema/routes/order";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

describe("GET: /order", () => {
  beforeEach(() => {
    req = { query: {}, body: {} };
    res = {};
    next = jest.fn();
  });

  const testTarget = validate(getOrderSchema, ["query"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.query = {
        orderId: "1",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.query = {
        orderId: "1d",
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "orderId",
        type: "field",
        value: "1d",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.query = {};

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "query",
        msg: ValidateErrorMessage.notExist,
        path: "orderId",
        type: "field",
        value: "",
      });
    });
  });
});

describe("POST: /order", () => {
  beforeEach(() => {
    req = {
      body: {
        walletAddress: "0xe829h129k480dflj289308",
        Order: {
          id: 1,
          ID_REQ: "0x3jr92j3u9obnf8",
          DETAIL: "세부 사항",
        },
        Transportation: {
          ID: 1,
          WALKING: 0,
          BICYCLE: 0,
          SCOOTER: 0,
          BIKE: 1,
          CAR: 0,
          TRUCK: 0,
        },
        Destination: {
          id: 1,
          X: 127.30692110367644,
          Y: 37.291365755002225,
          DETAIL: "세부주소",
        },
        Departure: {
          ID: 1,
          X: 126.83856100639186,
          Y: 37.59612415767913,
          DETAIL: "세부주소",
        },
        Product: {
          ID: 1,
          WIDTH: 60,
          LENGTH: 120,
          HEIGHT: 100,
          WEIGHT: 40,
        },
        Sender: {
          ID: 1,
          NAME: "홍길동",
          PHONE: "010-1234-1234",
        },
        Recipient: {
          id: 1,
          NAME: "김길동",
          PHONE: "010-1234-1234",
        },
      },
    };
    res = {};
    next = jest.fn();
  });

  const testTarget = validate(postOrderSchema, ["body"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.MISS_TYPE, async () => {
      req.body.Destination.id = "문자열";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "Destination.id",
        type: "field",
        value: "문자열",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body.Departure.X = "";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.notExist,
        path: "Departure.X",
        type: "field",
        value: "",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      delete req.body.Product;

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.notExist,
        path: "Product.ID",
        type: "field",
        value: undefined,
      });
    });

    test(TestName.MISS_TYPE, async () => {
      req.body.Sender.PHONE = "39fj20";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.mustBe(ExpectType.PHONE_NUMBER),
        path: "Sender.PHONE",
        type: "field",
        value: "39fj20",
      });
    });
  });
});

describe("PATCH: /order", () => {
  beforeEach(() => {
    req = {
      body: {
        userWalletAddress: "0xe829h129k480dflj289308",
        orderId: 1,
      },
    };
    res = {};
    next = jest.fn();
  });

  const testTarget = validate(patchOrderSchema, ["body"]);

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test(TestName.FAIL, async () => {
      req.body.orderId = "3e4";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "orderId",
        type: "field",
        value: "3e4",
      });
    });

    test(TestName.FAIL, async () => {
      req.body.orderId = "3";

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: ValidateErrorMessage.mustBe(ExpectType.INT),
        path: "orderId",
        type: "field",
        value: "3",
      });
    });
  });
});
