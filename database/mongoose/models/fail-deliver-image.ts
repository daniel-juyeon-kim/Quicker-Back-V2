import mongoose from "mongoose";

export interface FailDeliverImage {
  _id: string;
  image: Buffer;
  reason: string;
}

export const FailDeliverImageSchema = new mongoose.Schema<FailDeliverImage>({
  _id: { type: String, require: true },
  image: { type: Buffer, require: true },
  reason: { type: String, require: true },
});
