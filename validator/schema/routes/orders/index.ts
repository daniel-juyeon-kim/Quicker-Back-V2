import { ValidateErrorMessage } from "../../../src/error-message";

// GET /orders
export const getOrdersSchema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
  },
};
