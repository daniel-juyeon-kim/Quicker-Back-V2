import { mock } from "jest-mock-extended";
import { Repository } from "typeorm";
import { UnknownDataBaseError } from "../../../../../core";
import { Departure, Destination, Order, Product, Transportation, User } from "../../../../../database/type-orm";
import { LocationRepositoryImpl } from "../../../../../database/type-orm/repository/location/location.repository.impl";
import { initializeDataSource, testDataSource } from "../data-source";

const locationRepository = new LocationRepositoryImpl(testDataSource.getRepository(Order));

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

const createOrder = async (walletAddress: string) => {
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
  const recipient = {
    name: "이름",
    phone: "01012345678",
  };
  const destination = {
    x: 127.8494,
    y: 37.5,
    detail: "디테일",
  };
  const departure = {
    x: 127.09,
    y: 37.527,
    detail: "디테일",
  };
  const sender = {
    name: "이름",
    phone: "01012345678",
  };

  await testDataSource.transaction(async (manager) => {
    const requester = (await manager.findOneBy(User, { walletAddress })) as User;

    const order = manager.create(Order, {
      detail,
      requester,
    });

    await manager.save(Order, order);

    const id = order.id;

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
      recipient: {
        id,
        ...recipient,
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
  await createUser();
  const user = (await testDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(user.walletAddress);
  await createOrder(user.walletAddress);
});

describe("findDestinationDepartureByOrderId 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = 1;

    await expect(locationRepository.findDestinationDepartureByOrderId(orderId)).resolves.toEqual({
      id: orderId,
      departure: { x: 127.09, y: 37.527 },
      destination: { x: 127.8494, y: 37.5 },
    });
  });

  test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
    const orderId = 32;
    await expect(locationRepository.findDestinationDepartureByOrderId(orderId)).rejects.toThrow(
      `${orderId}에 대한 주소 정보가 존재하지 않습니다.`,
    );
  });

  test("실패하는 테스트, 예측하지 못한 에러", async () => {
    const orderId = 32;
    const repository = mock<Repository<Order>>();
    const error = new Error("알 수 없는 에러");

    repository.findOne.mockRejectedValue(error);

    const locationRepository = new LocationRepositoryImpl(repository as Repository<Order>);

    await expect(locationRepository.findDestinationDepartureByOrderId(orderId)).rejects.toBeInstanceOf(
      UnknownDataBaseError,
    );
    await expect(locationRepository.findDestinationDepartureByOrderId(orderId)).rejects.toStrictEqual(
      expect.objectContaining(error),
    );
  });
});

describe("findAllDestinationDepartureByOrderId 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(locationRepository.findAllDestinationDepartureByOrderId([1, 2])).resolves.toEqual([
      {
        id: 1,
        departure: { x: 127.09, y: 37.527 },
        destination: { x: 127.8494, y: 37.5 },
      },
      {
        id: 2,
        departure: { x: 127.09, y: 37.527 },
        destination: { x: 127.8494, y: 37.5 },
      },
    ]);
  });

  test("실패하는 테스트, 존재하는 값과 존재하지 않는 값이 섞임", async () => {
    await expect(locationRepository.findAllDestinationDepartureByOrderId([2, 3])).resolves.toEqual([
      {
        id: 2,
        departure: { x: 127.09, y: 37.527 },
        destination: { x: 127.8494, y: 37.5 },
      },
    ]);
  });

  test("실패하는 테스트, 존재하지 않는 값 입력", async () => {
    await expect(locationRepository.findAllDestinationDepartureByOrderId([3, 4])).resolves.toEqual([]);
  });
});
