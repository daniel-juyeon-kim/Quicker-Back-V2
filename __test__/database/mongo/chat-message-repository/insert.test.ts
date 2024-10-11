import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { Connection, Model } from "mongoose";
import { ChatMessage, ChatMessageRepository, ChatMessageSchema } from "../../../../database/mongoose";

let mongod: MongoMemoryServer;
let connector: Connection;
let ChatMessageModel: Model<ChatMessage>;
let repository: ChatMessageRepository;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  connector = mongoose.createConnection(mongod.getUri());
  ChatMessageModel = connector.model<ChatMessage>("chatMessage", ChatMessageSchema);
  repository = new ChatMessageRepository(ChatMessageModel);
});

beforeEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("saveMessage 테스트", () => {
  const ORDER_ID = "방 식별자";
  const USER_ID = "사용자 식별자";

  test("통과하는 테스트, 채팅방이 생성되지 않았으면 생성후 메시지를 저장", async () => {
    const createdDate = new Date(2000, 1, 1);
    const message = "메시지1";

    await repository.saveMessage(ORDER_ID, {
      userId: USER_ID,
      message,
      date: createdDate,
    });

    const result = await ChatMessageModel.findOne({ roomName: ORDER_ID }).select(["-__v", "-_id"]);

    expect(result?.toObject()).toEqual({
      roomName: ORDER_ID,
      messages: [{ _id: USER_ID, date: createdDate, message }],
    });
  });

  test("통과하는 테스트, 여러개의 메시지 저장", async () => {
    const saveMessage = async (message: string) => {
      await repository.saveMessage(ORDER_ID, {
        userId: USER_ID,
        message,
      });
    };

    await saveMessage("메시지1");
    await saveMessage("메시지2");

    const result = await ChatMessageModel.findOne({ roomName: ORDER_ID }).select(["-__v", "-_id", "-messages.date"]);

    expect(result?.toObject()).toEqual({
      roomName: ORDER_ID,
      messages: [
        { _id: USER_ID, message: "메시지1" },
        { _id: USER_ID, message: "메시지2" },
      ],
    });
  });
});
