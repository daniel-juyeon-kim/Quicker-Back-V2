import { existStringTypeInt } from "../../util";

export interface OrderSenderReceiverControllerRequestData {
  getSenderReceiverInfo: {
    orderId: string;
  };
}

// GET /order/{orderId}/sender-receiver-info
export const getSenderReceiverInfoSchema = {
  orderId: existStringTypeInt,
};
