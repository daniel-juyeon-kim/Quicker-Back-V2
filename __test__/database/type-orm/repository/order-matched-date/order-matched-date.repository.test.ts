import {
  DeliveryPersonMatchedDate,
  DeliveryPersonMatchedDateRepository,
  DuplicatedDataError,
} from "../../../../../database/type-orm";

import { initializeDataSource, testDataSource } from "../data-source";

const deliveryPersonMatchedDateRepository = new DeliveryPersonMatchedDateRepository(
  testDataSource.getRepository(DeliveryPersonMatchedDate),
);

beforeAll(async () => {
  await initializeDataSource(testDataSource);
});

afterEach(async () => {
  await testDataSource.manager.clear(DeliveryPersonMatchedDate);
});

describe("create 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = 1;

    await deliveryPersonMatchedDateRepository.create(testDataSource.manager, orderId);

    const order = await testDataSource.manager.findOneBy(DeliveryPersonMatchedDate, { id: orderId });

    expect(order?.id).toBe(orderId);
    expect(order?.date).not.toBeFalsy();
  });

  test("실패하는 테스트, 중복인 데이터", async () => {
    const orderId = 1;

    await deliveryPersonMatchedDateRepository.create(testDataSource.manager, orderId);

    await expect(deliveryPersonMatchedDateRepository.create(testDataSource.manager, orderId)).rejects.toStrictEqual(
      new DuplicatedDataError("1에 대해 중복된 데이터가 존재합니다."),
    );
  });
});
