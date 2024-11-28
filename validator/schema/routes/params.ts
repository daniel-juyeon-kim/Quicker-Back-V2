import { ParamsDictionary } from "express-serve-static-core";
import { existStringTypeInt } from "../util";
export type OrderIdParam = {
  orderId: string;
} & ParamsDictionary;

export const orderIdParamSchema = { orderId: existStringTypeInt };
