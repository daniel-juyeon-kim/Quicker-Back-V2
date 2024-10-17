import { Schema } from "express-validator";

import { DATA, validateStringTypeNumberList } from "../../../..";

// GET /orders/detail
export const getOrdersDetailSchema: Schema = {
  orderIds: {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    custom: {
      options: validateStringTypeNumberList,
    },
  },
};
