import { existInt } from "../../util";

export interface OrderCompleteImageControllerRequestData {
  getCompleteImage: { orderId: string };
  postCompleteImageBuffer: { orderId: number };
}

// POST /order/complete-image
export const postOrderImageCompleteSchema = {
  orderId: existInt,
};
