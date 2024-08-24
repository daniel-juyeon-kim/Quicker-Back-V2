import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../error-message";

// GET /average/cost
export const getAverageCostSchema: Schema = {
  distance: {
    trim: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isNumeric: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};
