import { Schema } from "express-validator";

import { validateStringTypeNumberList } from "../../../..";
import { ValidateErrorMessage } from "../../../../error-message";

// GET /orders/detail
export const getOrdersDetailSchema: Schema = {
  orderIds: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    custom: {
      options: validateStringTypeNumberList,
    },
  },
};
