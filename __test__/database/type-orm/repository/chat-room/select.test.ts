import { initializeDataSource } from "../../../../../database/type-orm";
import { Order } from "../../../../../database/type-orm/entity/order.entity";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { ChatRoomRepository } from "../../../../../database/type-orm/repository/impl/chat-room.repository";
import { OrderRepository } from "../../../../../database/type-orm/repository/impl/order.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";

const orderRepository = new OrderRepository(testAppDataSource);
const userRepository = new UserRepository(testAppDataSource);
const chatRoomRepository = new ChatRoomRepository(testAppDataSource);

const createUser = async () => {
  const hash = "아이디";
  const user = {
    id: hash,
    walletAddress: "지갑주소",
    name: "이름",
    email: "이메일",
    contact: "연락처",
  };
  const birthDate = {
    id: hash,
    date: new Date(2000, 9, 12).toLocaleDateString(),
  };

  await userRepository.createUser({ user, birthDate, hash });
};

const createOrder = async (requester: User) => {
  const orderParameter = {
    order: {
      requester,
      detail: "디테일",
    },
    product: {
      width: 0,
      length: 0,
      height: 0,
      weight: 0,
    },
    transportation: {
      walking: 0,
      bicycle: 0,
      scooter: 0,
      bike: 0,
      car: 0,
      truck: 0,
    },
    destination: {
      x: 37.5,
      y: 112,
      detail: "디테일",
    },
    recipient: {
      name: "이름",
      phone: "01012345678",
    },
    departure: {
      x: 0,
      y: 0,
      detail: "디테일",
    },
    sender: {
      name: "이름",
      phone: "01012345678",
    },
  };

  await orderRepository.create(orderParameter);
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
  await createUser();
});

beforeEach(async () => {
  const user = (await testAppDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(user);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(Order);
});

describe("chatRoomRepository 테스트", () => {
  test("findChatParticipantByOrderId 테스트", async () => {
    await expect(chatRoomRepository.findChatParticipantByOrderId(1)).resolves.toEqual({
      id: 1,
      departure: { id: 1, sender: { phone: "01012345678" }, x: 0, y: 0 },
      destination: { id: 1, recipient: { phone: "01012345678" }, x: 37.5, y: 112 },
    });
  });
});
