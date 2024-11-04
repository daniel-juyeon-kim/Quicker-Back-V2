import { DATA, mustBe, TYPE } from "../../../error-message";
import { existStringTypeInt } from "../../util";

export interface OrderSenderReceiverControllerRequestData {
  getSenderReceiverInfo: {
    orderId: string;
  };
}

// GET /room
export const getSenderReceiverInfoSchema = {
  orderId: existStringTypeInt,
};

// GET /room/message
export const getRoomMessageSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};
