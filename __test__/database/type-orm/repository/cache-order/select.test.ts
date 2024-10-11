import { CacheMatchedOrder, CacheOrderRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const START_DATE = new Date(2000, 0, 1, 0, 0, 0, 0);
const END_DATE = new Date(2000, 0, 31, 23, 59, 9, 999);

const cacheOrderRepository = new CacheOrderRepository(testAppDataSource.getRepository(CacheMatchedOrder));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await testAppDataSource.manager.save(CacheMatchedOrder, [
    { id: 1, date: new Date(1999, 11, 31, 23, 59, 59, 999) },
    { id: 2, date: START_DATE },
    { id: 3, date: END_DATE },
    { id: 4, date: new Date(2000, 1, 1, 0, 0, 0, 0) },
  ]);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(CacheMatchedOrder);
});

describe("findOrderIdsByBetweenDates 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(cacheOrderRepository.findAllOrderIdByBetweenDates(START_DATE, END_DATE)).resolves.toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });
});
