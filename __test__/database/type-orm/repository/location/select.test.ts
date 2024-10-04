import { initializeDataSource } from "../../../../../database/type-orm";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { LocationRepository } from "../../../../../database/type-orm/repository/impl/loaction.repository";
import { OrderRepository } from "../../../../../database/type-orm/repository/impl/order.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";

const locationRepository = new LocationRepository(testAppDataSource);
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

  await orderRepository.create(param);
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
  await createUser();
  const user = (await testAppDataSource.manager.findOneBy(User, { id: "아이디" })) as User;
  await createOrder(user);
  await createOrder(user);
});

describe("locationRepository 테스트", () => {
  test("findDestinationDepartureByOrderId 테스트", async () => {
    await expect(locationRepository.findDestinationDepartureByOrderId(1)).resolves.toEqual({
      id: 1,
      departure: { x: 127.09, y: 37.527 },
      destination: { x: 127.8494, y: 37.5 },
    });
  });

  test("findDestinationDepartureByOrderId 테스트", async () => {
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
});
