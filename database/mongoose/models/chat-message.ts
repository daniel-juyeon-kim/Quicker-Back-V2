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
  roomName: { type: String, required: true },
  messages: {
    type: [
      {
        _id: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, default: () => new Date() },
      },
    ],
    default: [],
  },
});
