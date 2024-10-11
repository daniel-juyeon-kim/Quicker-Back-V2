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
  const CREATED_DATE = new Date(2000, 1, 1);
  const chatMessage = new ChatMessageModel({
    roomName: "방 식별자",
    messages: [
      {
        _id: "사용자 식별자1",
        message: "메세지1",
        date: CREATED_DATE,
      },
      {
        _id: "사용자 식별자2",
        message: "메세지2",
        date: CREATED_DATE,
      },
      {
        _id: "사용자 식별자1",
        message: "메세지3",
        date: CREATED_DATE,
      },
    ],
  });
  await chatMessage.save();
});

afterEach(async () => {
  await connector.dropDatabase();
});

afterAll(async () => {
  await connector.destroy();
  await mongod.stop();
});

describe("find* 테스트", () => {
  const ORDER_ID = "방 식별자";
  const NOT_EXIST_ORDER_ID = "존재하지 않는 방 식별자";
  const ERROR_MESSAGE_NOT_EXIST_DATA = "데이터가 존재하지 않습니다.";
  const CREATED_DATE = new Date(2000, 1, 1);

  describe("findAllMessageByOrderId 테스트", () => {
    test("통과하는 테스트", async () => {
      await expect(repository.findAllMessageByOrderId(ORDER_ID)).resolves.toEqual({
        messages: [
          { _id: "사용자 식별자1", message: "메세지1", date: CREATED_DATE },
          { _id: "사용자 식별자2", message: "메세지2", date: CREATED_DATE },
          { _id: "사용자 식별자1", message: "메세지3", date: CREATED_DATE },
        ],
      });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      await expect(repository.findAllMessageByOrderId(NOT_EXIST_ORDER_ID)).rejects.toThrow(
        ERROR_MESSAGE_NOT_EXIST_DATA,
      );
    });
  });

  describe("findRecentMessageByOrderId 테스트", () => {
    test("통과하는 테스트", async () => {
      await expect(repository.findRecentMessageByOrderId(ORDER_ID)).resolves.toEqual({
        _id: "사용자 식별자1",
        message: "메세지3",
        date: CREATED_DATE,
      });
    });

    test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
      await expect(repository.findRecentMessageByOrderId(NOT_EXIST_ORDER_ID)).rejects.toThrow(
        ERROR_MESSAGE_NOT_EXIST_DATA,
      );
    });
  });
});
