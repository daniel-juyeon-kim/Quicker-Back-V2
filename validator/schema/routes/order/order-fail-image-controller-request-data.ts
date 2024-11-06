import { existInt, existString } from "../../util";

export interface OrderFailImageControllerRequestData {
  getOrderFailImage: {
    orderId: string;
  };

  postOrderFailImage: {
    orderId: number;
    reason: string;
  };
}

// POST /order/fail-image
export const postOrderFailImageSchema = {
  orderId: existInt,
  reason: existString,
};
