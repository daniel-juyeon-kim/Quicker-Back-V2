import mongoose from "mongoose";

const RealLocationSchema =new mongoose.Schema({
  address : String,
  X : Number,
  Y : Number
});

export default RealLocationSchema