import { message } from "../../../../src/message";
import { Types } from "../../../../src/types";

// GET /room/message
export const getMethodSchema = {
  orderNum: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};
