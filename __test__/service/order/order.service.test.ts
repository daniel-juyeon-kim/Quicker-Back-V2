import { mock, mockClear } from "jest-mock-extended";
import { DataSource } from "typeorm";
import { SmsApiError } from "../../../core";
import {
  DeliveryPersonMatchedDate,
  DeliveryPersonMatchedDateRepository,
  Departure,
  Destination,
  NotExistDataError,
  Order,
  OrderRepository,
  OrderRepositoryImpl,
  Product,
  ReceiverRepository,
  Transportation,
  User,
} from "../../../database";

import { DeliveryUrlMessage } from "../../../service/order/delivery-url-message";
import { OrderService } from "../../../service/order/order.service";
import { OrderServiceImpl } from "../../../service/order/order.service.impl";
import { initializeDataSource, testDataSource } from "../../database/type-orm/repository/data-source";

const dataSource = mock<DataSource>();
const orderRepository = mock<OrderRepository>();
const recipientRepository = mock<ReceiverRepository>();
const deliveryPersonMatchedDateRepository = mock<DeliveryPersonMatchedDateRepository>();
const deliveryUrlMessage = mock<DeliveryUrlMessage>();
const service = new OrderServiceImpl({
  dataSource,
  orderRepository,
  recipientRepository,
  deliveryPersonMatchedDateRepository,
  deliveryUrlMessage,
});

beforeEach(() => {
  mockClear(dataSource);
  mockClear(orderRepository);
  mockClear(recipientRepository);
  mockClear(deliveryPersonMatchedDateRepository);
  mockClear(deliveryUrlMessage);
});

describe("OrderService 테스트", () => {
  describe("createOrder 테스트", () => {
    test("통과하는 테스트", async () => {
      const body: Parameters<OrderService["createOrder"]>[0] = {
        walletAddress: "0x123456789abcdef",
        detail: "Fragile, handle with care",
        transportation: ["truck"],
        product: {
          width: 20,
          length: 30,
          height: 40,
          weight: 10,
        },
        destination: {
          x: 37.7749,
          y: -122.4194,
        },
        departure: {
          x: 34.0522,
          y: -118.2437,
        },
        sender: {
          name: "John Doe",
          phone: "123-456-7890",
        },
        receiver: {
          name: "Jane Smith",
          phone: "987-654-3210",
        },
      };

      await service.createOrder(body);

      const expectResult = {
        ...body,
        transportation: {
          bike: 0,
          car: 0,
          scooter: 0,
          walking: 0,
          bicycle: 0,
          truck: 1,
        },
      };

      expect(orderRepository.create).toHaveBeenCalledWith(expectResult);
    });
  });

  describe("matchDeliveryPersonAtOrder 테스트", () => {
    const createUser = async () => {
      const user = testDataSource.manager.create(User, {
        id: "아이디",
        walletAddress: "지갑주소",
        name: "이름",
        email: "이메일",
        contact: "연락처",
        birthDate: {
          id: "아이디",
          date: new Date(2000, 9, 12).toISOString(),
        },
        profileImage: {
          id: "아이디",
          imageId: "111",
        },
        joinDate: {
          id: "아이디",
          date: new Date(2023, 9, 12).toISOString(),
        },
      });

      await testDataSource.manager.save(User, user);
    };

    const createDeliveryPerson = async () => {
      const user = testDataSource.manager.create(User, {
        id: "배송원 아이디",
        walletAddress: "배송원 지갑주소",
        name: "이름",
        email: "이메일",
        contact: "배송원 연락처",
        birthDate: {
          id: "배송원 아이디",
          date: new Date(2000, 9, 12).toISOString(),
        },
        profileImage: {
          id: "배송원 아이디",
          imageId: "111",
        },
        joinDate: {
          id: "배송원 아이디",
          date: new Date(2023, 9, 12).toISOString(),
        },
      });

      await testDataSource.manager.save(User, user);
    };

    const createOrder = async (requester: User) => {
      const detail = "디테일";
      const product = {
        width: 0,
        length: 0,
        height: 0,
        weight: 0,
      };
      const transportation = {
        walking: 0,
        bicycle: 0,
        scooter: 0,
        bike: 0,
        car: 0,
        truck: 0,
      };
      const destination = {
        x: 37.5,
        y: 112,
        detail: "디테일",
      };
      const receiver = {
        name: "이름",
        phone: "01012345678",
      };
      const departure = {
        x: 0,
        y: 0,
        detail: "디테일",
      };
      const sender = {
        name: "이름",
        phone: "01012345678",
      };

      await testDataSource.transaction(async (manager) => {
        const id = 1;
        const order = manager.create(Order, {
          id,
          detail,
          requester,
        });

        await manager.save(Order, order);

        await manager.save(Product, {
          id,
          ...product,
          order: order,
        });
        await manager.save(Transportation, {
          id,
          ...transportation,
          order: order,
        });
        await manager.save(Destination, {
          id,
          ...destination,
          order: order,
          receiver: {
            id,
            ...receiver,
          },
        });
        await manager.save(Departure, {
          id,
          ...departure,
          order: order,
          sender: {
            id,
            ...sender,
          },
        });
      });
    };

    beforeAll(async () => {
      await initializeDataSource(testDataSource);
    });

    beforeEach(async () => {
      await createUser();
      await createDeliveryPerson();
      const user = (await testDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
      await createOrder(user);
    });

    afterEach(async () => {
      await testDataSource.manager.clear(Order);
      await testDataSource.manager.clear(User);
    });

    const orderRepository = new OrderRepositoryImpl(testDataSource.getRepository(Order));
    const recipientRepository = new ReceiverRepository();
    const deliveryPersonMatchedDateRepository = new DeliveryPersonMatchedDateRepository(
      testDataSource.getRepository(DeliveryPersonMatchedDate),
    );

    const service = new OrderServiceImpl({
      dataSource: testDataSource,
      orderRepository,
      recipientRepository,
      deliveryPersonMatchedDateRepository,
      deliveryUrlMessage,
    });
    describe("트랜젝션 테스트", () => {
      test("통과하는 테스트", async () => {
        const orderId = 1;
        const walletAddress = "배송원 지갑주소";

        await expect(service.matchDeliveryPersonAtOrder({ orderId, walletAddress })).resolves.toBe(undefined);

        await expect(
          testDataSource.manager.findOne(Order, {
            relations: {
              requester: true,
              deliveryPerson: true,
            },
            where: { id: 1 },
          }),
        ).resolves.toEqual({
          id: 1,
          detail: "디테일",
          deliveryPerson: {
            id: "배송원 아이디",
            contact: "배송원 연락처",
            email: "이메일",
            name: "이름",
            walletAddress: "배송원 지갑주소",
          },
          requester: {
            id: "아이디",
            contact: "연락처",
            email: "이메일",
            name: "이름",
            walletAddress: "지갑주소",
          },
        });
      });

      test("실패하는 테스트, db 계층에서 에러", async () => {
        const orderId = 2;
        const walletAddress = "배송원 지갑주소";

        await expect(service.matchDeliveryPersonAtOrder({ orderId, walletAddress })).rejects.toStrictEqual(
          new NotExistDataError(`${orderId} 에 대응되는 주문이 존재하지 않습니다.`),
        );

        await expect(
          testDataSource.manager.findOne(Order, {
            relations: {
              deliveryPerson: true,
            },
            where: { id: orderId },
          }),
        ).resolves.toEqual(null);
      });

      test("실패하는 테스트, 외부 api 에러 SmsApiError", async () => {
        const orderId = 1;

        const error = new SmsApiError("에러");

        deliveryUrlMessage.sendToReceiver.mockRejectedValueOnce(error);

        await expect(
          testDataSource.manager.findOne(Order, {
            relations: {
              deliveryPerson: true,
            },
            where: { id: orderId },
          }),
        ).resolves.toEqual({ deliveryPerson: null, detail: "디테일", id: 1 });
      });
    });
  });
});
