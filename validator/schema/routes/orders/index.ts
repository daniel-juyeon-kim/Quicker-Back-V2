import { existString } from "../../util";

// GET /orders
export const getOrdersSchema = {
  walletAddress: existString,
};
