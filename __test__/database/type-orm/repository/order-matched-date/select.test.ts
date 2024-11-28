import { DeliveryPersonMatchedDate, DeliveryPersonMatchedDateRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testDataSource } from "../data-source";

const START_DATE = new Date(2000, 0, 1, 0, 0, 0, 0);
const END_DATE = new Date(2000, 0, 31, 23, 59, 59, 999);

const deliveryPersonMatchedDateRepository = new DeliveryPersonMatchedDateRepository(
  testDataSource.getRepository(DeliveryPersonMatchedDate),
);

beforeAll(async () => {
  await initializeDataSource(testDataSource);
});

beforeEach(async () => {
  await testDataSource.manager.save(DeliveryPersonMatchedDate, [
    { id: 1, date: new Date(2000, 0, 0, 23, 59, 59, 999) },
    { id: 2, date: START_DATE },
    { id: 3, date: END_DATE },
    { id: 4, date: new Date(2000, 1, 1, 0, 0, 0, 0) },
  ]);
});

afterEach(async () => {
  await testDataSource.manager.clear(DeliveryPersonMatchedDate);
});

describe("findOrderIdsByBetweenDates 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(
      deliveryPersonMatchedDateRepository.findAllOrderIdByBetweenDates(START_DATE, END_DATE),
    ).resolves.toEqual([{ id: 2 }, { id: 3 }]);
  });
});
