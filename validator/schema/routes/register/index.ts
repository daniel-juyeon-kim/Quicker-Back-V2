import { Schema } from "express-validator";
import { DATA, mustBe, TYPE } from "../../../error-message";

const MAX_AGE = 100;
const MIN_AGE = 10;
const ERROR_MESSAGE_OUT_OF_REGISTRABLE_AGE_RANGE = "10세 이상 100세 이하만 가입 가능합니다.";

const mustBeExistAndString = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isString: {
    errorMessage: mustBe(TYPE.STRING),
  },
};

const mustBeExistAndInteger = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isInt: {
    errorMessage: mustBe(TYPE.INTEGER),
  },
};

// POST /register

export const postRegisterSchema: Schema = {
  User: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "User.name": {
    ...mustBeExistAndString,
  },
  "User.wallet_address": {
    ...mustBeExistAndString,
  },
  "User.email": {
    ...mustBeExistAndString,
    isEmail: {
      errorMessage: "이메일 형식이 아닙니다.",
    },
  },
  "User.contact": {
    ...mustBeExistAndString,
    isMobilePhone: {
      errorMessage: "전화번호 형식이 아닙니다.",
    },
  },
  Birthday: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Birthday.year": {
    ...mustBeExistAndInteger,
    isInt: {
      options: {
        min: new Date().getFullYear() - MAX_AGE,
        max: new Date().getFullYear() - MIN_AGE,
      },
      errorMessage: ERROR_MESSAGE_OUT_OF_REGISTRABLE_AGE_RANGE,
    },
  },
  "Birthday.month": {
    ...mustBeExistAndInteger,
  },
  "Birthday.date": {
    ...mustBeExistAndInteger,
  },
};
