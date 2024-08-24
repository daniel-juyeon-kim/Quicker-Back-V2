import { ValidateErrorMessage } from "../../../error-message";

// GET /orders
export const getOrdersSchema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
  },
};
