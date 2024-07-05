import { ExpectType, ValidateErrorMessage } from "../../../../../src/error-message";

// GET /order/image/complete
export const getMethodSchema = {
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
export const postMethodSchema = {
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
