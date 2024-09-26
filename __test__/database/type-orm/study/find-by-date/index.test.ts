import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { ChatMessage } from "./chat-message.entity";

const dataSource = createStudyDataSource(__dirname);
const date = new Date(1990, 1, 1).toISOString();

const chatMessage = {
  date,
  message: "메시지",
};

const createChatMessage = async () => {
  const chatMessageEntity = dataSource.manager.create(ChatMessage, chatMessage);
  await dataSource.manager.save(ChatMessage, chatMessageEntity);
};

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

beforeEach(async () => {
  await createChatMessage();
});

describe("date로 특정 데이터 선택하기(FindOptionsWhere)", () => {
  test("date 설정", async () => {
    // column 데코레이터의 값으로 {type: "date"}를 사용하면 해당 데코레이터에 매칭되는 클래스의 속성은 string타입이여야 함
    await expect(dataSource.manager.existsBy(ChatMessage, { date })).resolves.toBe(true);
  });
});
