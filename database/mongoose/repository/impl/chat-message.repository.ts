import { Model } from "mongoose";
import { isNull, isUndefined } from "../../../../util";
import { ChatMessage } from "../../models/chat-message";
import { MongoRepository } from "../abstract.repository";
export class ChatMessageRepository extends MongoRepository {
  constructor(private readonly model: Model<ChatMessage>) {
    super();
  }

  async saveMessage(orderId: string, { userId, message, date }: { userId: string; message: string; date?: Date }) {
    const isExistChatRoom = await this.isExistChatRoom(orderId);

    if (!isExistChatRoom) {
      await this.createChatRoom(orderId);
    }
    await this.updateMessage(orderId, { userId, message, date });
  }

  private async isExistChatRoom(orderId: string) {
    const room = await this.model.exists({ roomName: orderId });

    if (isNull(room)) {
      return false;
    }
    return true;
  }

  private async createChatRoom(orderId: string) {
    const userMessage = new this.model({
      roomName: orderId,
      messages: [],
    });

    await userMessage.save();
  }

  private async updateMessage(
    orderId: string,
    {
      userId,
      message,
      date,
    }: {
      userId: string;
      message: string;
      date?: Date;
    },
  ) {
    const createdDate = isUndefined(date) ? new Date() : date;
    await this.model.updateOne(
      { roomName: orderId },
      { $push: { messages: { _id: userId, message, date: createdDate } } },
    );
  }

  async findAllMessageByOrderId(orderId: string) {
    const messages = await this.model.findOne({ roomName: orderId }).select(["messages", "-_id"]);

    this.validateNull(messages);

    return messages.toObject();
  }

  async findRecentMessageByOrderId(orderId: string) {
    const recentMessage = await this.model.findOne({ roomName: orderId }).select("messages");

    this.validateNull(recentMessage);

    return recentMessage.toObject().messages.pop();
  }
}
