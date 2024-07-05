import { ExpectType, ValidateErrorMessage } from "../../../../src/error-message";

// GET /room/message
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
