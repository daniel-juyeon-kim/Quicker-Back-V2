import mongoose from "mongoose";

const MessageSchema =new mongoose.Schema({
  roomName: String,
  id: String,
  message: String,
  date : { type: Date, default: Date.now },
});

export default MessageSchema