import { DATA, mustBe, TYPE } from "../../../../../error-message";

// GET /order/image/complete
export const getOrderImageCompleteSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
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
