import { Schema } from "express-validator";
import { message } from "../../../../../src/message";
import { Types } from "../../../../../src/types";

// GET /user/image/id
export const getMethodSchema: Schema = {
  walletAddress: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING)
    },
    isNumeric: {
      errorMessage: message.mustBe(Types.INT)
    }
  },
};

// PUT /user/image/id
export const putMethodSchema: Schema = {
  walletAddress: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
  imageId: {
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isNumeric: {
      errorMessage: message.mustBe(Types.INT),
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};
