import { ExpectType, ValidateErrorMessage } from "../../../src/error-message";

const existAndString = {
  notEmpty: {
    errorMessage: ValidateErrorMessage.notExist,
  },
  isString: {
    errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
  },
};

const existAndInt = {
  notEmpty: {
    errorMessage: ValidateErrorMessage.notExist,
  },
  isInt: {
    errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
  },
};

// POST /register
export const postMethodSchema = {
  User: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "User.name": {
    ...existAndString,
  },
  "User.wallet_address": {
    ...existAndString,
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
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Birthday.year": {
    ...existAndInt,
  },
  "Birthday.month": {
    ...existAndInt,
  },
  "Birthday.date": {
    ...existAndInt,
  },
};
