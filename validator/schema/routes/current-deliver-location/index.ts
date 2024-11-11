import { Schema } from "express-validator";
import { existInt } from "../../util";

export interface OrdersDeliveryPersonLocationControllerRequestData {
  postDeliveryPersonCurrentLocation: {
    x: number;
    y: number;
    orderId: number;
  };
}

// POST /orders/delivery-person/location
export const postDeliveryPersonCurrentLocationSchema: Schema = {
  x: existInt,
  y: existInt,
  orderId: existInt,
};
