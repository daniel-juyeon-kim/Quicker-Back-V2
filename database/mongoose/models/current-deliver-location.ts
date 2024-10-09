import mongoose from "mongoose";

export interface Location {
  x: number;
  y: number;
}

export interface CurrentDeliverLocation {
  _id: string;
  location: Location[];
}

export const CurrentDeliverLocationSchema = new mongoose.Schema<CurrentDeliverLocation>({
  _id: String,
  location: [
    {
      x: Number,
      y: Number,
    },
  ],
});
