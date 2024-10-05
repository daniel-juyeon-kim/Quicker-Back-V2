import { initializeDataSource } from "../../../../../database/type-orm";
import { CacheMatchedOrder } from "../../../../../database/type-orm/entity/cache-matched-order.entity";
import { CacheOrderRepository } from "../../../../../database/type-orm/repository/impl/cache-order.repository";
import { testAppDataSource } from "../data-source";

const cacheOrderRepository = new CacheOrderRepository(testAppDataSource);

const startDate = new Date(2000, 0, 1);
const endDate = new Date(2000, 1, 1);

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await testAppDataSource.manager.save(CacheMatchedOrder, [
    { id: 1, date: new Date(1999, 11, 31) },
    { id: 2, date: startDate },
    { id: 3, date: new Date(2000, 0, 31) },
    { id: 4, date: endDate },
  ]);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(CacheMatchedOrder);
});

describe("cacheOrderRepository 테스트", () => {
  test("findOrderIdsByBetweenDates 테스트", async () => {
    await expect(cacheOrderRepository.findOrderIdsByBetweenDates(startDate, endDate)).resolves.toEqual([
      { id: 2 },
      { id: 3 },
    ]);
  });
});
