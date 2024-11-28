import { Schema } from "express-validator";
import { existStringTypePositiveInt } from "../../util";

// GET orders/average/cost/latest?distance={distance}
export const getAverageCostSchema: Schema = {
  distance: existStringTypePositiveInt,
};
