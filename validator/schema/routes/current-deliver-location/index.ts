import { Schema } from "express-validator";
import { DATA, mustBe, TYPE } from "../../../error-message";

// GET /current-deliver-location
export const getCurrentDeliverLocationSchema = {
  quicker: {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

// POST /current-deliver-location
export const postCurrentDeliverLocationSchema: Schema = {
  X: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      negated: true,
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  Y: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      negated: true,
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  address: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};
