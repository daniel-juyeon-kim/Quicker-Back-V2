import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../../../src/error-message";

// GET /user/image/id
export const getMethodSchema: Schema = {
  walletAddress: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
    isNumeric: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

// PUT /user/image/id
export const putMethodSchema: Schema = {
  walletAddress: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  imageId: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isNumeric: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};
