import { initializeDataSource } from "../../../../../database/type-orm";
import { Departure } from "../../../../../database/type-orm/entity/departure.entity";
import { Destination } from "../../../../../database/type-orm/entity/destination.entity";
import { Order } from "../../../../../database/type-orm/entity/order.entity";
import { Product } from "../../../../../database/type-orm/entity/product.entity";
import { Recipient } from "../../../../../database/type-orm/entity/recipient.entity";
import { Sender } from "../../../../../database/type-orm/entity/sender.entity";
import { Transportation } from "../../../../../database/type-orm/entity/transportation.entity";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { OrderRepository } from "../../../../../database/type-orm/repository/impl/order.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";

const orderRepository = new OrderRepository(testAppDataSource);
const userRepository = new UserRepository(testAppDataSource);

const createOrder = async () => {
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

  const requester = (await testAppDataSource.manager.findOneBy(User, { id: "아이디" })) as User;

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
});

beforeEach(async () => {
  await createOrder();
});

afterEach(async () => {
  await testAppDataSource.manager.clear(Order);
});

describe("orderRepository 테스트", () => {
  test("delete 테스트", async () => {
    await orderRepository.delete(1);

    await expect(testAppDataSource.manager.exists(Order)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Recipient)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Sender)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Destination)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Departure)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Product)).resolves.toBe(false);
    await expect(testAppDataSource.manager.exists(Transportation)).resolves.toBe(false);
  });
});
