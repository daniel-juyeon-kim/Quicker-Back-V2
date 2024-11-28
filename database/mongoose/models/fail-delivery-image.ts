import mongoose from "mongoose";

export interface FailDeliveryImage {
  _id: number;
  image: Buffer;
  reason: string;
}

export const FailDeliveryImageSchema = new mongoose.Schema<FailDeliveryImage>({
  _id: { type: Number, required: true },
  image: { type: Buffer, required: true },
  reason: { type: String, required: true },
});
