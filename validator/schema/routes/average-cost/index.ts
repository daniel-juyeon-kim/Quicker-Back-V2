import { Schema } from "express-validator";
import { Types, message } from "../../..";

export const getMethodSchema: Schema = {
  distance: {
    trim: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isNumeric: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};
