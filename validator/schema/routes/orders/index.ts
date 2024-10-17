import { DATA } from "../../..";

// GET /orders
export const getOrdersSchema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
  },
};
