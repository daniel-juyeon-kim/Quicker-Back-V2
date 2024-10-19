import { LocationRepository, Order, OrderRepository, User } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const locationRepository = new LocationRepository(testAppDataSource.getRepository(Order));
const orderRepository = new OrderRepository(testAppDataSource.getRepository(Order));

const createUser = async () => {
  const user = testAppDataSource.manager.create(User, {
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

  await testAppDataSource.manager.save(User, user);
};

const createOrder = async (requester: User) => {
  const orderCreationParameter = {
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
    recipient: {
      name: "이름",
      phone: "01012345678",
    },
    destination: {
      x: 127.8494,
      y: 37.5,
      detail: "디테일",
    },
    departure: {
      x: 127.09,
      y: 37.527,
      detail: "디테일",
    },
    sender: {
      name: "이름",
      phone: "01012345678",
    },
  };

  await orderRepository.create(orderCreationParameter);
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
  await createUser();
  const user = (await testAppDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(user);
  await createOrder(user);
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
    await expect(locationRepository.findDestinationDepartureByOrderId(32)).rejects.toThrow(
      "데이터가 존재하지 않습니다.",
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
