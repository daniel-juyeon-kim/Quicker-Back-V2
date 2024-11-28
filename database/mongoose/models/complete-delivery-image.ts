import mongoose from "mongoose";

export interface CompleteDeliveryImage {
  _id: number;
  bufferImage: Buffer;
}

export const CompleteDeliveryImageSchema = new mongoose.Schema<CompleteDeliveryImage>({
  _id: { type: Number, required: true },
  bufferImage: { type: Buffer, required: true },
});
