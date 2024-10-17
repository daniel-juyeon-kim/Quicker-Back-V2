import { Schema } from "express-validator";
import { DATA, FORMAT, mustBe, TYPE } from "../../../error-message";

// GET /order
export const getOrderSchema = {
  orderId: {
    trim: true,
    escape: true,
    exists: {
      errorMessage: DATA.NOT_EXIST,
    },
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};

const orderValidateSchema: Schema = {
  Order: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Order.id": {
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isString: {
      negated: true,
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Order.ID_REQ": {
    escape: true,
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  "Order.ID_DVRY": {
    isEmpty: {
      errorMessage: DATA.EXIST,
    },
  },
  "Order.DETAIL": {
    optional: true,
    escape: true,
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

const transportationSchema: Schema = {
  Transportation: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Transportation.ID": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.WALKING": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.BICYCLE": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.SCOOTER": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.BIKE": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.CAR": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Transportation.TRUCK": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};

const destinationSchema: Schema = {
  Destination: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Destination.id": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Destination.X": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Destination.Y": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Destination.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

const departureSchema: Schema = {
  Departure: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Departure.ID": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Departure.X": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Departure.Y": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Departure.DETAIL": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
};

const productSchema: Schema = {
  Product: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Product.ID": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Product.WIDTH": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Product.LENGTH": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Product.HEIGHT": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
  "Product.WEIGHT": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isFloat: {
      errorMessage: mustBe(TYPE.FLOAT),
    },
  },
};

const senderSchema: Schema = {
  Sender: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Sender.ID": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Sender.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  "Sender.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
    },
  },
};

const recipientSchema: Schema = {
  Recipient: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isObject: {
      errorMessage: mustBe(TYPE.OBJECT),
    },
  },
  "Recipient.id": {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
  "Recipient.NAME": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  "Recipient.PHONE": {
    escape: true,
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
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
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
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
      errorMessage: DATA.NOT_EXIST,
    },
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  orderId: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isInt: {
      errorMessage: mustBe(TYPE.INTEGER),
    },
    isString: {
      negated: true,
      errorMessage: mustBe(TYPE.INTEGER),
    },
  },
};
