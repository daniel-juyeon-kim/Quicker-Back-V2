import { Schema } from "express-validator";
import { DATA, FORMAT, mustBe, TYPE } from "../../../error-message";
import { validateTransportationRequestData } from "./custom-validator";

type Coordinate = { x: number; y: number };
type DeliverParticipant = { name: string; phone: string };

export interface OrderControllerRequestData {
  createOrder: {
    walletAddress: string;
    detail: string | undefined;
    transportation: ("bicycle" | "bike" | "car" | "scooter" | "truck" | "walking")[];
    product: {
      width: number;
      length: number;
      height: number;
      weight: number;
    };
    destination: Coordinate;
    departure: Coordinate;
    sender: DeliverParticipant;
    receiver: DeliverParticipant;
  };
  updateOrderDeliveryPerson: {
    walletAddress: string;
    orderId: number;
  };
}

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

const existAndInteger = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isInt: {
    errorMessage: mustBe(TYPE.INTEGER),
  },
};

const existAndString = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isString: {
    errorMessage: mustBe(TYPE.STRING),
  },
};

const existAndObject = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isObject: {
    errorMessage: mustBe(TYPE.OBJECT),
  },
};

const existAndFloat = {
  notEmpty: {
    errorMessage: DATA.NOT_EXIST,
  },
  isString: {
    negated: true,
  },
  isFloat: {
    errorMessage: mustBe(TYPE.FLOAT),
  },
};

const optionalAndString = {
  optional: true,
  isString: {
    errorMessage: mustBe(TYPE.STRING),
  },
};

const transportation = {
  transportation: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
    },
    isArray: {
      bail: true,
      errorMessage: mustBe(TYPE.ARRAY),
    },
    custom: {
      options: validateTransportationRequestData,
    },
  },
};

const destination: Schema = {
  destination: existAndObject,
  "destination.x": existAndFloat,
  "destination.y": existAndFloat,
  "destination.detail": optionalAndString,
};

const departure: Schema = {
  departure: existAndObject,
  "departure.x": existAndFloat,
  "departure.y": existAndFloat,
  "departure.detail": { optional: true, ...existAndString },
};

const product: Schema = {
  product: existAndObject,
  "product.width": existAndInteger,
  "product.length": existAndInteger,
  "product.height": existAndInteger,
  "product.weight": existAndInteger,
};

const sender: Schema = {
  sender: existAndObject,
  "sender.name": existAndString,
  "sender.phone": {
    ...existAndString,
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
    },
  },
};

const recipient: Schema = {
  recipient: existAndObject,
  "recipient.name": existAndString,
  "recipient.phone": {
    ...existAndString,
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
    },
  },
};

/**
 * walletAddress: string
 * detail:string | undefined
 * transportation: ("walking" | "bicycle" | "scooter" | "bike" | "car" | "truck")[]
 * product: {
 *  width: number;
 *  length: number;
 *  height: number;
 *  weight: number;
 * }
 * destination: {
 *  x: number
 *  y: number
 * },
 * departure: {
 *  x: number
 *  y: number
 * }
 * sender: {
 *  name: string;
 *  phone: string;
 * },
 * recipient: {
 *  name: string;
 *  phone: string;
 * }
 */

// POST /order
export const postOrderSchema: Schema = {
  walletAddress: existAndString,
  detail: {
    optional: true,
    isString: {
      errorMessage: mustBe(TYPE.STRING),
    },
  },
  ...transportation,
  ...destination,
  ...departure,
  ...product,
  ...sender,
  ...recipient,
};

// body: {
//   userWalletAddress : string
//   orderId: number
// }

// PATCH /order/delivery-person
export const patchOrderDeliveryPersonSchema: Schema = {
  walletAddress: existAndString,
  orderId: existAndInteger,
};
