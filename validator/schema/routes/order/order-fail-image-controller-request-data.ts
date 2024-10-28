import { DATA, mustBe, TYPE } from "../../../error-message";
import { existStringTypeInt } from "../../util";

export interface OrderFailImageControllerRequestData {
  getOrderFailImage: {
    orderId: string;
  };
}

// GET /order/fail-image
export const getOrderFailImageSchema = {
  orderId: existStringTypeInt,
};

// POST /order/image/fail
export const postOrderImageFailSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  reason: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};
