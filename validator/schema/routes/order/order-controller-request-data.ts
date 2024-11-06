import { Schema } from "express-validator";
import { DATA, FORMAT, mustBe, TYPE } from "../../../error-message";
import { existFloat, existInt, existObject, existString, optionalAndString } from "../../util";
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
  };
}

const transportation = {
  transportation: {
    notEmpty: {
      errorMessage: DATA.NOT_EXIST,
      bail: true,
    },
    isArray: {
      errorMessage: mustBe(TYPE.ARRAY),
      bail: true,
    },
    custom: {
      options: validateTransportationRequestData,
      bail: true,
    },
  },
};

const destination: Schema = {
  destination: existObject,
  "destination.x": existFloat,
  "destination.y": existFloat,
  "destination.detail": optionalAndString,
};

const departure: Schema = {
  departure: existObject,
  "departure.x": existFloat,
  "departure.y": existFloat,
  "departure.detail": { optional: true, ...existString },
};

const product: Schema = {
  product: existObject,
  "product.width": existInt,
  "product.length": existInt,
  "product.height": existInt,
  "product.weight": existInt,
};

const sender: Schema = {
  sender: existObject,
  "sender.name": existString,
  "sender.phone": {
    ...existString,
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
    },
  },
};

const receiver: Schema = {
  receiver: existObject,
  "receiver.name": existString,
  "receiver.phone": {
    ...existString,
    isMobilePhone: {
      errorMessage: mustBe(FORMAT.PHONE_NUMBER),
    },
  },
};

// POST /order
export const postOrderSchema: Schema = {
  walletAddress: existString,
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
  ...receiver,
};

// PATCH /order/{orderId}/delivery-person
export const patchOrderDeliveryPersonSchema: Schema = {
  walletAddress: existString,
};
