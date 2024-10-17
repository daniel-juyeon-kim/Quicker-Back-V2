import { Request, Response } from "express";
import { DATA, mustBe, TYPE, validate, ValidationLayerError } from "../../../../validator";
import { postRegisterSchema } from "../../../../validator/schema/routes/register";
import { UserControllerRequestData } from "../../../../validator/schema/routes/user";
import { TestName } from "../types/test-name";

let req: Partial<Request>;
let res: Partial<Response>;
const next = jest.fn();

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
  next.mockClear();
});

describe("POST: /register", () => {
  const runValidate = validate(postRegisterSchema, ["body"]);

  describe("통과하는 테스트", () => {
    test("유효한 요청", async () => {
      const body: UserControllerRequestData["registerUser"] = {
        User: {
          wallet_address: "0xABC123",
          name: "John Doe",
          email: "john@example.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };
      req.body = body;

      await runValidate(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("실패하는 테스트", () => {
    test("잘못된 이메일 형식", async () => {
      const body: UserControllerRequestData["registerUser"] = {
        User: {
          wallet_address: "0xABC123",
          name: "John Doe",
          email: "invalid-email",
          contact: "01012341234",
        },
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };
      req.body = body;

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: "이메일 형식이 아닙니다.",
          path: "User.email",
          type: "field",
          value: "invalid-email",
        }),
      );
    });

    test("필수 속성 누락", async () => {
      req.body = {
        User: {
          name: "John Doe",
        },
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: DATA.NOT_EXIST,
          path: "User.wallet_address",
          type: "field",
          value: undefined,
        }),
      );
    });

    test("잘못된 객체 속성", async () => {
      req.body = {
        User: "잘못된 값",
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: mustBe(TYPE.OBJECT),
          path: "User",
          type: "field",
          value: "잘못된 값",
        }),
      );
    });

    test(TestName.EMPTY_ATTRIBUTE, async () => {
      req.body = {
        User: {
          wallet_address: "0xABC123",
          name: "John Doe",
          email: "john@example.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1990,
          month: 12,
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: DATA.NOT_EXIST,
          path: "Birthday.date",
          type: "field",
          value: undefined,
        }),
      );
    });

    test("빈 문자열 필드", async () => {
      req.body = {
        User: {
          wallet_address: "0xABC123",
          name: "",
          email: "john@example.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: DATA.NOT_EXIST,
          path: "User.name",
          type: "field",
          value: "",
        }),
      );
    });

    test("잘못된 전화번호 형식", async () => {
      const body: UserControllerRequestData["registerUser"] = {
        User: {
          wallet_address: "0xABC123",
          name: "John Doe",
          email: "john@example.com",
          contact: "not-a-phone-number",
        },
        Birthday: {
          year: 1990,
          month: 12,
          date: 25,
        },
      };
      req.body = body;

      await runValidate(req as Request, res as Response, next);

      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: "전화번호 형식이 아닙니다.",
          path: "User.contact",
          type: "field",
          value: "not-a-phone-number",
        }),
      );
    });

    test("경계값: 태어난 연도 최소값", async () => {
      req.body = {
        User: {
          wallet_address: "0xABC123",
          name: "John Doe",
          email: "john@example.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1923, // 경계값으로 가정
          month: 12,
          date: 25,
        },
      };

      await runValidate(req as Request, res as Response, next);

      // 가정: 연도에 대한 최소값 검증 실패 시의 처리
      expect(next.mock.calls[0][0]).toStrictEqual(
        new ValidationLayerError({
          location: "body",
          msg: "10세 이상 100세 이하만 가입 가능합니다.",
          path: "Birthday.year",
          type: "field",
          value: 1923,
        }),
      );
    });
  });
});
