import { Schema } from "express-validator";
import { message } from "../../../src/message";
import { Types } from "../../../src/types";

// GET /current-deliver-location
export const getMethodSchema = {
  quicker: {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};

// POST /current-deliver-location
export const postMethodSchema: Schema = {
  X: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      negated: true,
      errorMessage: message.mustBe(Types.INT),
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  Y: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      negated: true,
      errorMessage: message.mustBe(Types.INT),
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  address: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};
