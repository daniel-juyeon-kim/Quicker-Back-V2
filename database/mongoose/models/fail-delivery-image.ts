import mongoose from "mongoose";

export interface FailDeliveryImage {
  _id: string;
  image: Buffer;
  reason: string;
}

export const FailDeliveryImageSchema = new mongoose.Schema<FailDeliveryImage>({
  _id: { type: String, required: true },
  image: { type: Buffer, required: true },
  reason: { type: String, required: true },
});
