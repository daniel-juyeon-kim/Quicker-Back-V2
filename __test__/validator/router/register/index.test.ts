import { NextFunction, Request, Response } from "express";
import { postMethodSchema } from "../../../../validator/schema/routes/register";
import { Types, message, validate } from "../../../../validator";
import { TestName } from "../types/test-name";


let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {};
  next = jest.fn();
});

// User : {
//     id!: string; // 추후 생성 값
//     wallet_address!: string;
//     name!: string;
//     email!: string;
//     contact!: string;
// }

// Birthday: {
//     id!: string; // 추후 생성 값
//     year!: number;
//     month!: number;
//     date!: number;
// }
describe("POST: /register", () => {
  const testTarget = validate(postMethodSchema, ["body"])

  describe(TestName.VALID_REQUSET, () => {
    test(TestName.PASS, async () => {
      req.body = {
        User: {
          wallet_address: "문자열",
          name: "문자열",
          email: "temp@gmail.com",
          contact: "01012341234",
        },
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe(TestName.INVALID_REQUSET, () => {
    test("이메일 형식 테스트", async () => {
      req.body = {
        User: {
          wallet_address: "문자열",
          name: "문자열",
          email: "temp@gmaicom",
          contact: "01012341234",
        },
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: "이메일 형식이 아닙니다.",
        path: "User.email",
        type: "field",
        value: "temp@gmaicom",
      });
    });

    test(TestName.MISS_TYPE, async () => {
      req.body = {
        User: "문자열",
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.mustBe(Types.OBJECT),
        path: "User",
        type: "field",
        value: "문자열",
      });
    });

    test(TestName.NOT_EXIST_ATTRIBUTE, async () => {
      req.body = {
        User: {
          name: "이름"
        },
        Birthday: {
          year: 1999,
          month: 1,
          date: 1,
        },
      };

      await testTarget(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith({
        location: "body",
        msg: message.notExist,
        path: "User.wallet_address",
        type: "field",
        value: undefined,
      });
    });
    
    test(TestName.EMPTY_ATTRIBUTE, async () => {
        req.body = {
          User: {
            wallet_address: "문자열",
            name: "문자열",
            email: "temp@gmaicom",
            contact: "01012341234",
          },
          Birthday: {
            year: 1999,
            month: 1,
          },
        };
  
        await testTarget(req as Request, res as Response, next);
  
        expect(next).toHaveBeenCalledWith({
          location: "body",
          msg: message.notExist,
          path: "Birthday.date",
          type: "field",
          value: undefined,
        });
      });
  });
});
