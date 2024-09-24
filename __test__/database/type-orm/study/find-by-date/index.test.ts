import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../connector/data-source";
import { ChatMessage } from "./chat-message.entity";

const date = new Date(1990, 1, 1).toISOString();

const chatMessage = {
  date,
  message: "메시지",
};

const createChatMessage = async () => {
  const chatMessageEntity = studyDataSource.manager.create(ChatMessage, chatMessage);
  await studyDataSource.manager.save(ChatMessage, chatMessageEntity);
};

const removeChatMessage = async () => {
  await studyDataSource.manager.clear(ChatMessage);
};

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

beforeEach(async () => {
  await createChatMessage();
});

afterEach(async () => {
  await removeChatMessage();
});

describe("date로 특정 데이터 선택하기(FindOptionsWhere)", () => {
  test("date 설정", async () => {
    // column 데코레이터의 값으로 {type: "date"}를 사용하면 해당 데코레이터에 매칭되는 클래스의 속성은 string타입이여야 함
    await expect(studyDataSource.manager.existsBy(ChatMessage, { date })).resolves.toBe(true);
  });
});
