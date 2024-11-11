import mongoose from "mongoose";

export interface Location {
  x: number;
  y: number;
}

export interface CurrentDeliveryLocation {
  _id: number;
  location: Location[];
}

export const CurrentDeliveryLocationSchema = new mongoose.Schema<CurrentDeliveryLocation>({
  _id: Number,
  location: [
    {
      x: Number,
      y: Number,
    },
  ],
});
