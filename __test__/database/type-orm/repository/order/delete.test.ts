import { DataSource } from "typeorm";
import {
  Departure,
  Destination,
  Order,
  OrderRepositoryImpl,
  Product,
  Receiver,
  Sender,
  Transportation,
  User,
} from "../../../../../database/type-orm";

import { initializeDataSource, testDataSource } from "../data-source";

const orderRepository = new OrderRepositoryImpl(testDataSource.getRepository(Order));

const createUser = async (dataSource: DataSource) => {
  const userId = "아이디";

  const user = dataSource.manager.create(User, {
    id: userId,
    walletAddress: "지갑주소",
    name: "이름",
    email: "이메일",
    contact: "연락처",
    birthDate: {
      id: userId,
      date: new Date(2000, 9, 12).toISOString(),
    },
    profileImage: {
      id: userId,
    },
    joinDate: {
      id: userId,
      date: new Date(2023, 9, 12).toISOString(),
    },
  });

  await dataSource.manager.save(User, user);
};

const createOrder = async (dataSource: DataSource, requester: User) => {
  await dataSource.transaction(async (manager) => {
    const order = manager.create(Order, {
      requester,
      detail: "디테일",
    });

    await manager.save(order);

    const id = order.id;

    const product = manager.create(Product, {
      id,
      width: 0,
      length: 0,
      height: 0,
      weight: 0,
      order,
    });

    const transportation = manager.create(Transportation, {
      id,
      walking: 0,
      bicycle: 0,
      scooter: 0,
      bike: 0,
      car: 0,
      truck: 0,
      order,
    });

    const destination = manager.create(Destination, {
      id,
      x: 37.5,
      y: 112,
      detail: "디테일",
      order,
      receiver: {
        id,
        name: "이름",
        phone: "01012345678",
      },
    });

    const departure = manager.create(Departure, {
      id,
      x: 0,
      y: 0,
      detail: "디테일",
      order,
      sender: {
        id,
        name: "이름",
        phone: "01012345678",
      },
    });

    await Promise.allSettled([
      manager.save(Product, product),
      manager.save(Transportation, transportation),
      manager.save(Destination, destination),
      manager.save(Departure, departure),
    ]);
  });
};

beforeAll(async () => {
  await initializeDataSource(testDataSource);
});

beforeEach(async () => {
  await createUser(testDataSource);
  const requester = (await testDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(testDataSource, requester);
});

afterEach(async () => {
  await testDataSource.manager.clear(Order);
});

describe("orderRepository 테스트", () => {
  test("delete 테스트", async () => {
    await expect(testDataSource.manager.exists(Order)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Receiver)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Sender)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Destination)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Departure)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Product)).resolves.toBe(true);
    await expect(testDataSource.manager.exists(Transportation)).resolves.toBe(true);

    const orderId = 1;
    await orderRepository.deleteByOrderId(orderId);

    await expect(testDataSource.manager.exists(Order)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Receiver)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Sender)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Destination)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Departure)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Product)).resolves.toBe(false);
    await expect(testDataSource.manager.exists(Transportation)).resolves.toBe(false);
  });
});
