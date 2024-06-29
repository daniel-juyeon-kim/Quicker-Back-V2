import { message } from "../../../../../src/message";
import { Types } from "../../../../../src/types";

// GET /order/image/fail
export const getMethodSchema = {
  orderId: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
}

// POST /order/image/fail
export const postMethodSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  reason: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
}
