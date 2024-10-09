import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { ChatMessage, ChatMessageSchema } from "../../../../database/mongoose/models/chat-message";
import { ChatMessageRepository } from "../../../../database/mongoose/repository/impl/chat-message.repository";

let mongod: MongoMemoryServer;
let connector: Connection;
let model: Model<ChatMessage>;
let repository: ChatMessageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  model = connector.model<ChatMessage>("chatMessage", ChatMessageSchema);
  repository = new ChatMessageRepository(model);
});

beforeEach(async () => {
  const date = new Date(2000, 1, 1);
  const Model = new model({
    roomName: "방 식별자",
    messages: [
      {
        _id: "사용자 식별자1",
        message: "메세지1",
        date,
      },
      {
        _id: "사용자 식별자2",
        message: "메세지2",
        date,
      },
      {
        _id: "사용자 식별자1",
        message: "메세지3",
        date,
      },
    ],
  });
  await Model.save();
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("ChatMessageRepository 테스트", () => {
  const date = new Date(2000, 1, 1);

  test("findAllMessage 테스트", async () => {
    const result = await repository.findAllMessage("방 식별자");

    expect(result?.toJSON()).toEqual({
      messages: [
        { _id: "사용자 식별자1", message: "메세지1", date },
        { _id: "사용자 식별자2", message: "메세지2", date },
        { _id: "사용자 식별자1", message: "메세지3", date },
      ],
    });
  });

  test("findAllMessage 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findAllMessage("존재하지 않는 방 식별자")).rejects.toThrow("데이터가 존재하지 않습니다.");
  });

  test("findRecentMessageByOrderId 테스트", async () => {
    const result = await repository.findRecentMessageByOrderId("방 식별자");

    expect(result).toEqual({ _id: "사용자 식별자1", message: "메세지3", date });
  });

  test("findRecentMessageByOrderId 테스트, 존재하지 않는 값 입력", async () => {
    await expect(repository.findRecentMessageByOrderId("존재하지 않는 방 식별자")).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
    );
  });
});
