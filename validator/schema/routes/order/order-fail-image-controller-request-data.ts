import { existInt, existString, existStringTypeInt } from "../../util";

export interface OrderFailImageControllerRequestData {
  getOrderFailImage: {
    orderId: string;
  };

  postOrderFailImage: {
    orderId: number;
    reason: string;
  };
}

// GET /order/fail-image
export const getOrderFailImageSchema = {
  orderId: existStringTypeInt,
};

// POST /order/fail-image
export const postOrderFailImageSchema = {
  orderId: existInt,
  reason: existString,
};
