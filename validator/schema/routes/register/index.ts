import { message } from "../../../src/message";
import { Types } from "../../../src/types";

const existAndString = {
  notEmpty: {
    errorMessage: message.notExist,
  },
  isString: {
    errorMessage: message.mustBe(Types.STRING),
  },
};

const existAndInt = {
  notEmpty: {
    errorMessage: message.notExist,
  },
  isInt: {
    errorMessage: message.mustBe(Types.INT),
  },
};

// POST /register
export const postMethodSchema = {
  User: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "User.name": {
    ...existAndString,
  },
  "User.wallet_address": {
    ...existAndString
  },
  "User.email": {
    ...existAndString,
    isEmail: {
      errorMessage: "이메일 형식이 아닙니다.",
    },
  },
  "User.contact": {
    ...existAndString,
    isMobilePhone: {
      errorMessage: "전화번호 형식이 아닙니다.",
    },
  },
  Birthday: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Birthday.year": {
    ...existAndInt
  },
  "Birthday.month": {
    ...existAndInt
  },
  "Birthday.date": {
    ...existAndInt
  },
};
