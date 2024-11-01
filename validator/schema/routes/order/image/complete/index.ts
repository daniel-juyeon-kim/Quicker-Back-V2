import { DATA, mustBe, TYPE } from "../../../../../error-message";
import { existStringTypeInt } from "../../../../util";

export interface OrderCompleteImageControllerRequestData {
  getCompleteImage: { orderId: string };
}

// GET /order/complete-image
export const getOrderCompleteImageSchema = {
  orderId: existStringTypeInt,
};

// POST /order/image/complete
export const postOrderImageCompleteSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};
