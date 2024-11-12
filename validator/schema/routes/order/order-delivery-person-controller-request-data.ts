import { Schema } from "express-validator";
import { existInt, existString } from "../../util";

export interface OrderDeliveryPersonControllerRequestData {
  postDeliveryPersonCurrentLocation: {
    x: number;
    y: number;
    orderId: number;
  };

  updateOrderDeliveryPerson: {
    walletAddress: string;
  };
}

// POST /orders/delivery-person/location
export const postDeliveryPersonCurrentLocationSchema: Schema = {
  x: existInt,
  y: existInt,
  orderId: existInt,
}; // PATCH /order/{orderId}/delivery-person

export const patchOrderDeliveryPersonSchema: Schema = {
  walletAddress: existString,
};
