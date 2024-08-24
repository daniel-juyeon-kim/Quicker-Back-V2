import { ExpectType, ValidateErrorMessage } from "../../../../../error-message";

// GET /order/image/fail
export const getOrderImageFailSchema = {
  orderId: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

// POST /order/image/fail
export const postOrderImageFailSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  reason: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};
