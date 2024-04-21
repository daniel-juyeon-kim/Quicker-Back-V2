import { message } from "../../../src/message";

// GET /orders
export const getMethodSchema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
  },
};
