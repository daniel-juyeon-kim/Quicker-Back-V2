import mongoose from "mongoose";

export interface ChatMessage {
  roomName: string;
  messages: [
    {
      _id: string;
      message: string;
      date: Date;
    },
  ];
}

export const ChatMessageSchema = new mongoose.Schema<ChatMessage>({
  roomName: { type: String, require: true },
  messages: [
    {
      _id: { type: String, require: true },
      message: { type: String, require: true },
      date: { type: Date, default: Date.now },
    },
  ],
});
