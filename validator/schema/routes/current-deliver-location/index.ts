import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../src/error-message";

// GET /current-deliver-location
export const getCurrentDeliverLocationSchema = {
  quicker: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

// POST /current-deliver-location
export const postCurrentDeliverLocationSchema: Schema = {
  X: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      negated: true,
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  Y: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      negated: true,
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  address: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};
