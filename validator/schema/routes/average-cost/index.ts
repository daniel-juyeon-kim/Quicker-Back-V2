import { Schema } from "express-validator";
import { DATA, mustBe, TYPE } from "../../../error-message";

// GET /average/cost
export const getAverageCostSchema: Schema = {
  distance: {
    trim: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isNumeric: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};
