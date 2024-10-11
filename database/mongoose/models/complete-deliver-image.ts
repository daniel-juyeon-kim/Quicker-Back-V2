import mongoose from "mongoose";

export interface CompleteDeliverImage {
  _id: string;
  image: Buffer;
}

export const CompleteDeliverImageSchema = new mongoose.Schema<CompleteDeliverImage>({
  _id: { type: String, required: true },
  image: { type: Buffer, required: true },
});
