import { Schema } from "express-validator";
import { ExpectType, ValidateErrorMessage } from "../../../src/error-message";

// GET /order
export const getOrderSchema = {
  orderId: {
    trim: true,
    escape: true,
    exists: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

const orderValidateSchema: Schema = {
  Order: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Order.id": {
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isString: {
      negated: true,
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Order.ID_REQ": {
    escape: true,
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  "Order.ID_DVRY": {
    isEmpty: {
      errorMessage: ValidateErrorMessage.exist,
    },
  },
  "Order.DETAIL": {
    optional: true,
    escape: true,
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

const transportationSchema: Schema = {
  Transportation: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Transportation.ID": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.WALKING": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.BICYCLE": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.SCOOTER": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.BIKE": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.CAR": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Transportation.TRUCK": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};

const destinationSchema: Schema = {
  Destination: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Destination.id": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Destination.X": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Destination.Y": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Destination.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

const departureSchema: Schema = {
  Departure: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Departure.ID": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Departure.X": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Departure.Y": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Departure.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
};

const productSchema: Schema = {
  Product: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Product.ID": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Product.WIDTH": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Product.LENGTH": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Product.HEIGHT": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
  "Product.WEIGHT": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isFloat: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.FLOAT),
    },
  },
};

const senderSchema: Schema = {
  Sender: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Sender.ID": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Sender.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  "Sender.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
    isMobilePhone: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.PHONE_NUMBER),
    },
  },
};

const recipientSchema: Schema = {
  Recipient: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isObject: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.OBJECT),
    },
  },
  "Recipient.id": {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
  "Recipient.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  "Recipient.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
    isMobilePhone: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.PHONE_NUMBER),
    },
  },
};

// body: {
//   userWalletAddress: string,
//   Order: {
//     id: number;
//     ID_REQ: string;
//     ID_DVRY: string | undefined;
//     DETAIL: string | undefined;
//   },
//   Transportation: {
//     ID: number;
//     WALKING: number;
//     BICYCLE: number;
//     SCOOTER: number;
//     BIKE: number;
//     CAR: number;
//     TRUCK: number;
//   },
//   Destination: {
//     id: number;
//     X: number;
//     Y: number;
//     DETAIL: string;
//   },
//   Departure: {
//     ID: number;
//     X: number;
//     Y: number;
//     DETAIL: string;
//   },
//   Product: {
//     ID: number;
//     WIDTH: number;
//     LENGTH: number;
//     HEIGHT: number;
//     WEIGHT: number;
//   },
//   Sender: {
//     ID: number;
//     NAME: string;
//     PHONE: string;
//   },
//   Recipient: {
//     id: number;
//     NAME: string;
//     PHONE: string;
//   }
// }

// POST /order
export const postOrderSchema: Schema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  ...orderValidateSchema,
  ...transportationSchema,
  ...destinationSchema,
  ...departureSchema,
  ...productSchema,
  ...senderSchema,
  ...recipientSchema,
};

// body: {
//   userWalletAddress : string
//   orderId: number
// }

// PATCH /order
export const patchOrderSchema: Schema = {
  userWalletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isString: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.STRING),
    },
  },
  orderId: {
    notEmpty: {
      errorMessage: ValidateErrorMessage.notExist,
    },
    isInt: {
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
    isString: {
      negated: true,
      errorMessage: ValidateErrorMessage.mustBe(ExpectType.INT),
    },
  },
};
