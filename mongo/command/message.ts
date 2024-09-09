import connectMongo from "../connector";
import MessageSchema from "../schemas/message";
export class MessageModel {
  async create(message: MessageObject) {
    try {
      const conn = await connectMongo("chat");
      const Message = conn.model(String(message.roomName), MessageSchema);
      const userMessage = new Message({
        id: message.id,
        message: message.receiveMessage,
        roomName: message.roomName,
      });
      await userMessage.save();
      conn.destroy();
    } catch (error) {
      console.error(error);
    }
  }

  async find(roomName: string) {
    try {
      const conn = await connectMongo("chat");
      const messageModel = conn.model(roomName, MessageSchema);
      const messages = await messageModel.find();
      await conn.destroy();
      return messages;
    } catch (error) {
      console.error(error);
    }
  }

  async findRecent(orderNum: number) {
    const connection = await connectMongo("chat");
    const messageModel = connection.model(String(orderNum), MessageSchema);
    const recentMessage = await messageModel.findOne().select(["-_id", "-__v", "-roomName"]).sort({ $natural: -1 });
    await connection.destroy();
    return recentMessage;
  }
}

interface MessageObject {
  id: string;
  roomName: string;
  receiveMessage: string;
}
