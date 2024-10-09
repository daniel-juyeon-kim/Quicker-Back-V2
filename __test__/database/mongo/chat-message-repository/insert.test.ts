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
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("ChatMessageRepository 테스트", () => {
  test("saveMessage 테스트, 채팅방이 생성되지 않았으면 생성후 메시지를 저장", async () => {
    const date = new Date(2000, 1, 1);
    await repository.saveMessage("방 식별자", {
      userId: "사용자 식별자",
      message: "메시지1",
      date: date,
    });

    const result = await model.findOne({ roomName: "방 식별자" }).select(["-__v", "-_id"]);

    expect(result?.toJSON()).toEqual({
      roomName: "방 식별자",
      messages: [{ _id: "사용자 식별자", date, message: "메시지1" }],
    });
  });

  test("saveMessage 테스트, 여러개의 메시지 저장", async () => {
    await repository.saveMessage("방 식별자", {
      userId: "사용자 식별자",
      message: "메시지1",
    });
    await repository.saveMessage("방 식별자", {
      userId: "사용자 식별자",
      message: "메시지2",
    });

    const result = await model.findOne({ roomName: "방 식별자" }).select(["-__v", "-_id", "-messages.date"]);

    expect(result?.toJSON()).toEqual({
      roomName: "방 식별자",
      messages: [
        { _id: "사용자 식별자", message: "메시지1" },
        { _id: "사용자 식별자", message: "메시지2" },
      ],
    });
  });
});
