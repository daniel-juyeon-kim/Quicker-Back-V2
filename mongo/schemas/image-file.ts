import mongoose from "mongoose";

export const ImageFileSchema = new mongoose.Schema({
  image: Buffer,
  reason: String,
});

export const ImageFile = new mongoose.Schema({
  image: Buffer,
});