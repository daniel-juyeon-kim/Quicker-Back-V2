import { ChatRoomRepository, Order, OrderRepository, User } from "../../../../../database/type-orm";
import { UserRepositoryImpl } from "../../../../../database/type-orm/repository/impl/user/user.repository.impl";
import { initializeDataSource, testAppDataSource } from "../data-source";

const orderRepository = new OrderRepository(testAppDataSource.getRepository(Order));
const userRepository = new UserRepositoryImpl(testAppDataSource.getRepository(User));
const chatRoomRepository = new ChatRoomRepository(testAppDataSource.getRepository(Order));

const createUser = async () => {
  const userId = "아이디";
  const user = {
    id: userId,
    walletAddress: "지갑주소",
    name: "이름",
    email: "이메일",
    contact: "연락처",
  };
  const birthDate = new Date(2000, 9, 12);

  await userRepository.createUser({ user, birthDate, id: userId });
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

describe("findChatParticipantByOrderId 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = 1;

    await expect(chatRoomRepository.findChatParticipantByOrderId(orderId)).resolves.toEqual({
      id: orderId,
      departure: {
        id: orderId,
        x: 0,
        y: 0,
        sender: { phone: "01012345678" },
      },
      destination: {
        id: orderId,
        x: 37.5,
        y: 112,
        recipient: { phone: "01012345678" },
      },
    });
  });

  test("실패하는 테스트, 존재하지 않는 주문 아이디 입력", async () => {
    await expect(chatRoomRepository.findChatParticipantByOrderId(32)).rejects.toThrow("데이터가 존재하지 않습니다.");
  });
});
