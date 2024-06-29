import { message } from "../../../../../src/message";
import { Types } from "../../../../../src/types";

// GET /order/image/complete
export const getMethodSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: message.notExist
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};

// POST /order/image/complete
export const postMethodSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: message.notExist
    },
    isString: {
      errorMessage: message.mustBe(Types.INT),
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};
