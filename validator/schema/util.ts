import { DATA, mustBe, TYPE } from "../error-message";

export const existInt = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
    bail: true,
  },
  isString: {
    negated: true,
    errorMessage: mustBe(TYPE.INTEGER),
    bail: true,
  },
  isInt: {
    errorMessage: mustBe(TYPE.INTEGER),
    bail: true,
  },
};
export const existString = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
    bail: true,
  },
  isString: {
    errorMessage: mustBe(TYPE.STRING),
    bail: true,
  },
};
export const existObject = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
    bail: true,
  },
  isObject: {
    errorMessage: mustBe(TYPE.OBJECT),
    bail: true,
  },
};
export const existFloat = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
    bail: true,
  },
  isString: {
    negated: true,
    errorMessage: mustBe(TYPE.FLOAT),
    bail: true,
  },
  isFloat: {
    errorMessage: mustBe(TYPE.FLOAT),
    bail: true,
  },
};
export const optionalAndString = {
  optional: true,
  isString: {
    errorMessage: mustBe(TYPE.STRING),
  },
};
export const existStringTypeInt = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
    bail: true,
  },
  isInt: {
    errorMessage: mustBe(TYPE.INTEGER),
    bail: true,
  },
};
