import { existInt, existStringTypeInt } from "../../util";

export interface OrderCompleteImageControllerRequestData {
  getCompleteImage: { orderId: string };
  postCompleteImageBuffer: { orderId: number };
}
// GET /order/complete-image

export const getOrderCompleteImageSchema = {
  orderId: existStringTypeInt,
};
// POST /order/complete-image

export const postOrderImageCompleteSchema = {
  orderId: existInt,
};
