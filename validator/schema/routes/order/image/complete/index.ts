import { ExpectType, ValidateErrorMessage } from "../../../../../src/error-message";

// GET /order/image/complete
export const getOrderImageCompleteSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

// POST /order/image/complete
export const postOrderImageCompleteSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};
