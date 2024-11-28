import { Schema } from "express-validator";

import { ParamsDictionary } from "express-serve-static-core";
import { DATA, validateStringTypeNumberList } from "../../../..";

export type OrderIdsParam = { orderIds: string } & ParamsDictionary;

// GET /orders/:orderIds/detail
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
