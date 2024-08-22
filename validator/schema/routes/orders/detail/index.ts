import { Schema } from "express-validator";

import { CustomValidator } from "../../../..";
import { ValidateErrorMessage } from "../../../../src/error-message";

// GET /orders/detail
export const getOrdersDetailSchema: Schema = {
  orderIds: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    custom: {
      options: CustomValidator.validateIntList,
    },
  },
};
