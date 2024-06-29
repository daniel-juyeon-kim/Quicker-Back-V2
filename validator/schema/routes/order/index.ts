import { Schema } from "express-validator";
import { message } from "../../../src/message";
import { Types } from "../../../src/types";

// GET /order
export const getMethodSchema = {
  orderId: {
    trim: true,
    escape: true,
    exists: {
      errorMessage: message.notExist,
    },
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};

const orderValidateSchema: Schema = {
  Order: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Order.id": {
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
    isString: {
      negated: true,
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Order.ID_REQ": {
    escape: true,
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
  "Order.ID_DVRY": {
    isEmpty: {
      errorMessage: message.exist,
    },
  },
  "Order.DETAIL": {
    optional: true,
    escape: true,
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};

const transportationSchema: Schema = {
  Transportation: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Transportation.ID": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.WALKING": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.BICYCLE": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.SCOOTER": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.BIKE": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.CAR": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Transportation.TRUCK": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
};

const destinationSchema: Schema = {
  Destination: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Destination.id": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Destination.X": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Destination.Y": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Destination.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};

const departureSchema: Schema = {
  Departure: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Departure.ID": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Departure.X": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Departure.Y": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Departure.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
};

const productSchema: Schema = {
  Product: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Product.ID": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Product.WIDTH": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Product.LENGTH": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Product.HEIGHT": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
  "Product.WEIGHT": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isFloat: {
      errorMessage: message.mustBe(Types.FLOAT),
    },
  },
};

const senderSchema: Schema = {
  Sender: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Sender.ID": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Sender.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
  "Sender.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
    isMobilePhone: {
      errorMessage: message.mustBe(Types.PHONE_NUMBER),
    },
  },
};

const recipientSchema: Schema = {
  Recipient: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isObject: {
      errorMessage: message.mustBe(Types.OBJECT),
    },
  },
  "Recipient.id": {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
  },
  "Recipient.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
  "Recipient.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
    isMobilePhone: {
      errorMessage: message.mustBe(Types.PHONE_NUMBER),
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
export const postMethodSchema: Schema = {
  walletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
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
export const patchMethodSchema: Schema = {
  userWalletAddress: {
    escape: true,
    notEmpty: {
      errorMessage: message.notExist,
    },
    isString: {
      errorMessage: message.mustBe(Types.STRING),
    },
  },
  orderId: {
    notEmpty: {
      errorMessage: message.notExist,
    },
    isInt: {
      errorMessage: message.mustBe(Types.INT),
    },
    isString: {
      negated: true,
      errorMessage: message.mustBe(Types.INT),
    },
  },
};
