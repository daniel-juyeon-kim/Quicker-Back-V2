import { initializeDataSource } from "../../../../../database/type-orm";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { OrderRepository } from "../../../../../database/type-orm/repository/impl/order.repository";
import { RecipientRepository } from "../../../../../database/type-orm/repository/impl/recipient.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";

const recipientRepository = new RecipientRepository(testAppDataSource);
const userRepository = new UserRepository(testAppDataSource);
const orderRepository = new OrderRepository(testAppDataSource);

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
  const param = {
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

  await orderRepository.create(param);
};

beforeEach(async () => {
  await initializeDataSource(testAppDataSource);
  await createUser();
  const user = (await testAppDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(user);
});

describe("recipientRepository 테스트", () => {
  test("findPhoneNumber 테스트", async () => {
    await expect(recipientRepository.findPhoneNumber(1)).resolves.toEqual({ id: 1, phone: "01012345678" });
  });
});
