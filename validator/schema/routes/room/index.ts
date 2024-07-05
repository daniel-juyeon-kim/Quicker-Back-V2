import { ExpectType, ValidateErrorMessage } from "../../../src/error-message";

// GET /room
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
