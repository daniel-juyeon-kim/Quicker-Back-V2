import { ExpectType, ValidateErrorMessage } from "../../../../src/error-message";

// GET /user/name
export const getMethodSchema = {
  walletAddress: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};
