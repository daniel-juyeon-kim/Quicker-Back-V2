import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../src/error-message";

export const getMethodSchema: Schema = {
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
