import { Model } from "mongoose";
import { isNull } from "../../../../util";
import { ChatMessage } from "../../models/chat-message";
import { MongoRepository } from "../abstract.repository";
export class ChatMessageRepository extends MongoRepository {
  constructor(private readonly model: Model<ChatMessage>) {
    super();
  }

  async saveMessage(roomName: string, { userId, message, date }: { userId: string; message: string; date?: Date }) {
    const isExistChatRoom = await this.isExistChatRoom(roomName);

    if (!isExistChatRoom) {
      await this.createChatRoom(roomName);
    }
    await this.updateMessage(roomName, { userId, message, date });
  }

  private async isExistChatRoom(roomName: string) {
    const room = await this.model.exists({ roomName });

    if (isNull(room)) {
      return false;
    }
    return true;
  }

  private async createChatRoom(roomName: string) {
    const userMessage = new this.model({
      roomName,
      messages: [],
    });

    await userMessage.save();
  }

  private async updateMessage(
    roomName: string,
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
    await this.model.updateOne({ roomName }, { $push: { messages: { _id: userId, message, date } } });
  }

  async findAllMessage(roomName: string) {
    const messages = await this.model.findOne({ roomName }).select(["-_id", "-__v", "-roomName"]);

    this.validateNull(messages);

    return messages;
  }

  async findRecentMessageByOrderId(orderId: string) {
    const recentMessage = await this.model.findOne({ roomName: orderId }).select(["-_id", "-__v", "-roomName"]);

    this.validateNull(recentMessage);

    return recentMessage.toJSON().messages.pop();
  }
}
