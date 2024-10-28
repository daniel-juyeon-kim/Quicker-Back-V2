import { Request, Response } from "express";
import { HttpErrorResponse } from "../../../../util/http-response";
import { validate } from "../../../../validator";
import {
  patchOrderDeliveryPersonSchema,
  postOrderSchema,
} from "../../../../validator/schema/routes/order/order-controller-request-data";

let req: Partial<Request>;
let res: Partial<Response>;
const next = jest.fn();

beforeEach(() => {
  req = { query: {}, body: {} };
  res = { send: jest.fn() };
  next.mockClear();
});

describe("POST /order 요청 데이터 검증 테스트", () => {
  const runValidate = validate(postOrderSchema, ["body"]);

  describe("통과하는 테스트", () => {
    test("일반적인 테스트", async () => {
      req.body = {
        walletAddress: "0xABC123",
        detail: "Delivery details",
        transportation: ["walking", "bicycle", "car"],
        destination: {
          x: 37.5665,
          y: 126.978,
          detail: "Final destination details",
        },
        departure: {
          x: 37.5665,
          y: 126.978,
          detail: "Departure location",
        },
        product: {
          width: 10,
          length: 20,
          height: 5,
          weight: 500,
        },
        sender: {
          name: "John Doe",
          phone: "01012341234",
        },
        recipient: {
          name: "Jane Doe",
          phone: "01098765432",
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(); // 성공 시 next()로 넘어가야 함
    });

    test("옵셔널 속성 테스트", async () => {
      req.body = {
        walletAddress: "0xABC123",
        transportation: ["walking", "bicycle", "car"],
        destination: {
          x: 37.5665,
          y: 126.978,
        },
        departure: {
          x: 37.5665,
          y: 126.978,
        },
        product: {
          width: 10,
          length: 20,
          height: 5,
          weight: 500,
        },
        sender: {
          name: "John Doe",
          phone: "01012341234",
        },
        recipient: {
          name: "Jane Doe",
          phone: "01098765432",
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("실패하는 테스트", () => {
    test("필요속성 누락", async () => {
      req.body = {};

      await runValidate(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "product.width",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "정수 이어야 합니다.",
            path: "product.width",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "product.length",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "정수 이어야 합니다.",
            path: "product.length",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "product.height",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "정수 이어야 합니다.",
            path: "product.height",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "product.weight",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "정수 이어야 합니다.",
            path: "product.weight",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "walletAddress",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "문자열 이어야 합니다.",
            path: "walletAddress",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "destination",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "객체 이어야 합니다.",
            path: "destination",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "departure",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "객체 이어야 합니다.",
            path: "departure",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "product",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "객체 이어야 합니다.",
            path: "product",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "sender",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "객체 이어야 합니다.",
            path: "sender",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "sender.name",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "문자열 이어야 합니다.",
            path: "sender.name",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "recipient",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "객체 이어야 합니다.",
            path: "recipient",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "recipient.name",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "문자열 이어야 합니다.",
            path: "recipient.name",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "destination.x",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "실수 이어야 합니다.",
            path: "destination.x",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "destination.y",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "실수 이어야 합니다.",
            path: "destination.y",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "departure.x",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "실수 이어야 합니다.",
            path: "departure.x",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "departure.y",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "실수 이어야 합니다.",
            path: "departure.y",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "sender.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "문자열 이어야 합니다.",
            path: "sender.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "전화번호 형식 이어야 합니다.",
            path: "sender.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "recipient.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "문자열 이어야 합니다.",
            path: "recipient.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "전화번호 형식 이어야 합니다.",
            path: "recipient.phone",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "데이터가 존재하지 않습니다.",
            path: "transportation",
            location: "body",
          },
          {
            type: "field",
            value: undefined,
            msg: "배열 이어야 합니다.",
            path: "transportation",
            location: "body",
          },
        ]),
      );
    });

    test("타입이 불일치", async () => {
      req.body = {
        walletAddress: 12345, // 문자열이어야 함
        transportation: ["unknown"],
        destination: {
          x: "wrongType", // 숫자이어야 함
          y: 126.978,
        },
        departure: {
          x: 37.5665,
          y: "invalidType", // 숫자이어야 함
          detail: 12345, // 문자열이어야 함
        },
        product: {
          width: "notInt", // 정수이어야 함
          length: 20,
          height: 5,
          weight: 500,
        },
        sender: {
          name: "John Doe",
          phone: "invalidPhoneNumber", // 전화번호 형식이어야 함
        },
        recipient: {
          name: "Jane Doe",
          phone: "invalidPhoneNumber", // 전화번호 형식이어야 함
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(res.send).toHaveBeenCalledWith(
        new HttpErrorResponse(400, [
          {
            location: "body",
            msg: "정수 이어야 합니다.",
            path: "product.width",
            type: "field",
            value: "notInt",
          },
          {
            location: "body",
            msg: "문자열 이어야 합니다.",
            path: "walletAddress",
            type: "field",
            value: 12345,
          },
          {
            location: "body",
            msg: "문자열 이어야 합니다.",
            path: "departure.detail",
            type: "field",
            value: 12345,
          },
          {
            location: "body",
            msg: "Invalid value",
            path: "destination.x",
            type: "field",
            value: "wrongType",
          },
          {
            location: "body",
            msg: "실수 이어야 합니다.",
            path: "destination.x",
            type: "field",
            value: "wrongType",
          },
          {
            location: "body",
            msg: "Invalid value",
            path: "departure.y",
            type: "field",
            value: "invalidType",
          },
          {
            location: "body",
            msg: "실수 이어야 합니다.",
            path: "departure.y",
            type: "field",
            value: "invalidType",
          },
          {
            location: "body",
            msg: "전화번호 형식 이어야 합니다.",
            path: "sender.phone",
            type: "field",
            value: "invalidPhoneNumber",
          },
          {
            location: "body",
            msg: "전화번호 형식 이어야 합니다.",
            path: "recipient.phone",
            type: "field",
            value: "invalidPhoneNumber",
          },
          {
            location: "body",
            msg: "유효한 값이 아닙니다.",
            path: "transportation",
            type: "field",
            value: ["unknown"],
          },
        ]),
      );
    });
  });
});

describe("PATCH: /order/delivery-person", () => {
  const testTarget = validate(patchOrderDeliveryPersonSchema, ["body"]);

  test("통과하는 테스트", async () => {
    req.body = {
      orderId: 1,
      walletAddress: "0xe829h129k480dflj289308",
    };

    await testTarget(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  test("실패하는 테스트, 주문 아이디 타입 불일치", async () => {
    req.body.orderId = "3e4";

    await testTarget(req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith(
      new HttpErrorResponse(400, [
        {
          location: "body",
          msg: "정수 이어야 합니다.",
          path: "orderId",
          type: "field",
          value: "3e4",
        },
        {
          location: "body",
          msg: "데이터가 존재하지 않습니다.",
          path: "walletAddress",
          type: "field",
          value: undefined,
        },
        {
          location: "body",
          msg: "문자열 이어야 합니다.",
          path: "walletAddress",
          type: "field",
          value: undefined,
        },
      ]),
    );
  });

  test("실패하는 테스트, 지갑주소 필드 누락", async () => {
    req.body.orderId = "3";

    await testTarget(req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith(
      new HttpErrorResponse(400, [
        {
          location: "body",
          msg: "데이터가 존재하지 않습니다.",
          path: "walletAddress",
          type: "field",
          value: undefined,
        },
        {
          location: "body",
          msg: "문자열 이어야 합니다.",
          path: "walletAddress",
          type: "field",
          value: undefined,
        },
      ]),
    );
  });
});
