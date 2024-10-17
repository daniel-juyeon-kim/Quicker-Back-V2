import { DATA, mustBe, TYPE } from "../../../../../error-message";

// GET /order/image/fail
export const getOrderImageFailSchema = {
  orderId: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
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
