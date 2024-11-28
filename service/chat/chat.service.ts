import { ChatMessageRepository } from "../../database";

export class ChatService {
  constructor(private readonly repository: ChatMessageRepository) {}

  async findRecentMessage(roomId: string) {
    return await this.repository.findRecentMessageByOrderId(parseInt(roomId));
  }
}
