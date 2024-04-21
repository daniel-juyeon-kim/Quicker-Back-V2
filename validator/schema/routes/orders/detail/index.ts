import { Schema } from "express-validator";
import { message } from "../../../../src/message";
import { validateIntList } from "../../../../util/custom-validator";

// GET /orders/detail
export const getMethodSchema: Schema = {
  orderIds: {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    custom: {
      options: validateIntList
    }
  },
};
