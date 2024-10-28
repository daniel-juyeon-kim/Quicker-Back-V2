import { DataSource } from "typeorm";
import {
  BusinessRuleConflictDataError,
  Departure,
  Destination,
  NotExistDataError,
  Order,
  OrderRepositoryImpl,
  Product,
  Transportation,
  User,
} from "../../../../../database/type-orm";
import { initializeDataSource, testDataSource } from "../data-source";

const orderRepository = new OrderRepositoryImpl(testDataSource.getRepository(Order));
const manager = testDataSource.manager;

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
      id: 1,
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
      recipient: {
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
  const user = (await testDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(testDataSource, user);
});

afterEach(async () => {
  await testDataSource.manager.clear(User);
});

describe("orderRepository 테스트", () => {
  describe("updateDeliver 테스트", () => {
    test("통과하는 테스트", async () => {
      const deliveryPerson = manager.create(User, {
        id: "배송원 아이디",
        walletAddress: "배송원 지갑 주소",
        name: "배송원 이름",
        email: "베송원 이메일",
        contact: "배송원 연락처",
      });

      await manager.save(User, deliveryPerson);

      await orderRepository.updateDeliveryPersonAtOrder(manager, {
        walletAddress: deliveryPerson.walletAddress,
        orderId: 1,
      });

      const order = await manager.findOne(Order, {
        relations: {
          requester: true,
          deliveryPerson: true,
        },
        where: { id: 1 },
      });

      expect(order).toEqual({
        id: 1,
        detail: "디테일",
        requester: {
          id: "아이디",
          walletAddress: "지갑주소",
          name: "이름",
          email: "이메일",
          contact: "연락처",
        },
        deliveryPerson: {
          id: "배송원 아이디",
          walletAddress: "배송원 지갑 주소",
          name: "배송원 이름",
          email: "베송원 이메일",
          contact: "배송원 연락처",
        },
      });
    });

    test("실패하는 테스트, 존재하지 배송원", async () => {
      await expect(
        orderRepository.updateDeliveryPersonAtOrder(manager, { walletAddress: "존재하지 않는 지갑주소", orderId: 1 }),
      ).rejects.toStrictEqual(new NotExistDataError("존재하지 않는 지갑주소 에 대응되는 사용자가 존재하지 않습니다."));
    });

    test("실패하는 테스트, 존재하지 않는 주문", async () => {
      const deliveryPerson = manager.create(User, {
        id: "배송원 아이디",
        walletAddress: "배송원 지갑 주소",
        name: "배송원 이름",
        email: "베송원 이메일",
        contact: "배송원 연락처",
      });

      await manager.save(User, deliveryPerson);

      await expect(
        orderRepository.updateDeliveryPersonAtOrder(manager, {
          walletAddress: deliveryPerson.walletAddress,
          orderId: 2,
        }),
      ).rejects.toStrictEqual(new NotExistDataError("2 에 대응되는 주문이 존재하지 않습니다."));
    });

    test("실패하는 테스트, 배송원과 요청한 사람이 동일함", async () => {
      const walletAddress = "지갑주소";
      const orderId = 1;

      await expect(
        orderRepository.updateDeliveryPersonAtOrder(manager, { walletAddress, orderId }),
      ).rejects.toStrictEqual(new BusinessRuleConflictDataError(`${walletAddress}가 의뢰인의 지갑주소와 동일합니다.`));
    });
  });
});
