import mongoose from "mongoose";

export interface FailDeliverImage {
  _id: string;
  image: Buffer;
  reason: string;
}

export const FailDeliverImageSchema = new mongoose.Schema<FailDeliverImage>({
  _id: { type: String, required: true },
  image: { type: Buffer, required: true },
  reason: { type: String, required: true },
});
