import { message } from "../../../../src/message";
import { Types } from "../../../../src/types";

// GET /user/name
export const getMethodSchema = {
  walletAddress: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};
