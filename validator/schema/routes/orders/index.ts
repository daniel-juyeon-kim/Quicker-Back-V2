import { ValidateErrorMessage } from "../../../src/error-message";

// GET /orders
export const getMethodSchema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
  },
};
