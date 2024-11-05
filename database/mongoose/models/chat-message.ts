import mongoose from "mongoose";

export interface ChatMessage {
  roomId: number;
  messages: {
    walletAddress: string;
    message: string;
    date: Date;
  }[];
}

export const ChatMessageSchema = new mongoose.Schema<ChatMessage>({
  roomId: { type: Number, required: true },
  messages: {
    type: [
      {
        walletAddress: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: Date, default: () => new Date(), required: true },
      },
    ],
    default: [],
  },
});
