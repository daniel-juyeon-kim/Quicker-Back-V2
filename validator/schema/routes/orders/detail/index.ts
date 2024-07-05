import { Schema } from "express-validator";

import { CustomValidator } from "../../../..";
import { ValidateErrorMessage } from "../../../../src/error-message";

// GET /orders/detail
export const getMethodSchema: Schema = {
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
