import { mock, mockClear } from "jest-mock-extended";
import { ChatMessageRepository } from "../../../database";
import { ChatService } from "../../../service/chat/chat.service";

const repository = mock<ChatMessageRepository>();
const service = new ChatService(repository);

beforeEach(() => {
  mockClear(repository);
});

describe("ChatService", () => {
  test("findRecentMessage()", async () => {
    const orderId = "1";

    await service.findRecentMessage(orderId);

    expect(repository.findRecentMessageByOrderId).toHaveBeenCalledWith(1);
  });
});
