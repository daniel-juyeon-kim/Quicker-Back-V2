import { Model } from "mongoose";
import { UnknownDataBaseError } from "../../../../core";
import { isNull, isUndefined } from "../../../../util";
import { NotExistDataError } from "../../../type-orm";
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
    const room = await this.model.exists({ roomId: orderId });

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
      { roomId: orderId },
      { $push: { messages: { _id: userId, message, date: createdDate } } },
    );
  }

  async findAllMessageByOrderId(orderId: number) {
    const messages = await this.model
      .findOne({ roomId: orderId })
      .select({ messages: { _id: 0 } })
      .select({ _id: 0, roomId: 0, __v: 0 })
      .lean();

    this.validateNull(messages);

    return messages;
  }

  async findRecentMessageByOrderId(roomId: number) {
    try {
      const userMessages = await this.model.findOne({ roomId: roomId }, "-messages._id").lean();

      this.validateNull(userMessages);

      const recentMessage = userMessages.messages.pop();

      if (isUndefined(recentMessage)) {
        throw new NotExistDataError("데이터가 존재하지 않습니다.");
      }

      return recentMessage;
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${roomId}에 대한 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
