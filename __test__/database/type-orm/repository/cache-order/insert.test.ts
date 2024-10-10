import { CacheMatchedOrder } from "../../../../../database/type-orm/entity/cache-matched-order.entity";
import { CacheOrderRepository } from "../../../../../database/type-orm/repository/impl/cache-order.repository";
import { initializeDataSource, testAppDataSource } from "../data-source";

const cacheOrderRepository = new CacheOrderRepository(testAppDataSource);

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

describe("cacheOrderRepository 테스트", () => {
  test("create 테스트", async () => {
    await cacheOrderRepository.create(1);

    const order = await testAppDataSource.manager.findOneBy(CacheMatchedOrder, { id: 1 });
    expect(order?.id).toBe(1);
    expect(order?.date).not.toBeFalsy();
  });
});
