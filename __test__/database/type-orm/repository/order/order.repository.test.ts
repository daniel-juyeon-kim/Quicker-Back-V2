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

const createUser = async (
  dataSource: DataSource,
  { userId, walletAddress, contact }: { userId: string; walletAddress: string; contact: string },
) => {
  const user = dataSource.manager.create(User, {
    id: userId,
    walletAddress,
    name: "이름",
    email: "이메일",
    contact,
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

  return await dataSource.manager.save(User, user);
};

const createOrder = async (
  dataSource: DataSource,
  { requester, deliveryPerson, orderId }: { requester: User; deliveryPerson: User | null; orderId: number },
) => {
  await dataSource.transaction(async (manager) => {
    const order = manager.create(Order, {
      id: orderId,
      requester,
      deliveryPerson,
      detail: "디테일",
    });

    await manager.save(order);

    const id = orderId;

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

    return id;
  });
};

beforeAll(async () => {
  await initializeDataSource(testDataSource);
});

describe("orderRepository 테스트", () => {
  describe("updateDeliver 테스트", () => {
    beforeAll(async () => {
      const user = await createUser(testDataSource, {
        userId: "의뢰인 아이디",
        walletAddress: "의뢰인 지갑 주소",
        contact: "의뢰인 연락처",
      });
      await createOrder(testDataSource, { requester: user, deliveryPerson: null, orderId: 1 });
    });

    afterAll(async () => {
      await testDataSource.manager.clear(User);
    });

    test("통과하는 테스트", async () => {
      const deliveryPerson = await createUser(testDataSource, {
        userId: "배송원 아이디",
        walletAddress: "배송원 지갑 주소",
        contact: "배송원 연락처",
      });

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
        deliveryPerson: {
          contact: "배송원 연락처",
          email: "이메일",
          id: "배송원 아이디",
          name: "이름",
          walletAddress: "배송원 지갑 주소",
        },
        requester: {
          contact: "의뢰인 연락처",
          email: "이메일",
          id: "의뢰인 아이디",
          name: "이름",
          walletAddress: "의뢰인 지갑 주소",
        },
      });
    });

    test("실패하는 테스트, 존재하지 않는 배송원", async () => {
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
      const walletAddress = "의뢰인 지갑 주소";
      const orderId = 1;

      await expect(
        orderRepository.updateDeliveryPersonAtOrder(manager, { walletAddress, orderId }),
      ).rejects.toStrictEqual(new BusinessRuleConflictDataError(`${walletAddress}가 의뢰인의 지갑주소와 동일합니다.`));
    });
  });

  describe("findAllCreatedOrDeliveredOrderDetailByOrderIds()", () => {
    beforeAll(async () => {
      const requester1 = await createUser(testDataSource, {
        userId: "의뢰인 아이디",
        walletAddress: "의뢰인 지갑주소",
        contact: "01012341234",
      });
      const deliveryPerson1 = await createUser(testDataSource, {
        userId: "배송원 아이디",
        walletAddress: "배송원 지갑주소",
        contact: "01066868684",
      });
      const requester2 = await createUser(testDataSource, {
        userId: "의뢰인 아이디",
        walletAddress: "의뢰인 지갑주소",
        contact: "01054832876",
      });
      const deliveryPerson2 = await createUser(testDataSource, {
        userId: "배송원 아이디",
        walletAddress: "배송원 지갑주소",
        contact: "01086544683",
      });

      await createOrder(testDataSource, { requester: requester1, deliveryPerson: null, orderId: 1 });
      await createOrder(testDataSource, { requester: requester2, deliveryPerson: null, orderId: 2 });
      await createOrder(testDataSource, { requester: deliveryPerson1, deliveryPerson: null, orderId: 3 });
      await createOrder(testDataSource, { requester: deliveryPerson2, deliveryPerson: null, orderId: 4 });
    });

    test("통과하는 테스트", async () => {
      await expect(orderRepository.findAllCreatedOrDeliveredOrderDetailByOrderIds([2, 3])).resolves.toEqual([
        {
          departure: {
            detail: "디테일",
            sender: {
              name: "이름",
              phone: "01012345678",
            },
            x: 0,
            y: 0,
          },
          destination: {
            detail: "디테일",
            receiver: {
              name: "이름",
              phone: "01012345678",
            },
            x: 37.5,
            y: 112,
          },
          detail: "디테일",
          id: 2,
          product: {
            height: 0,
            length: 0,
            weight: 0,
            width: 0,
          },
        },
        {
          departure: {
            detail: "디테일",
            sender: {
              name: "이름",
              phone: "01012345678",
            },
            x: 0,
            y: 0,
          },
          destination: {
            detail: "디테일",
            receiver: {
              name: "이름",
              phone: "01012345678",
            },
            x: 37.5,
            y: 112,
          },
          detail: "디테일",
          id: 3,
          product: {
            height: 0,
            length: 0,
            weight: 0,
            width: 0,
          },
        },
      ]);
    });
  });
});
