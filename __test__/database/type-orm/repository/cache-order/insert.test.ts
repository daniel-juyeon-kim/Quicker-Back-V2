import { CacheMatchedOrder, CacheOrderRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const cacheOrderRepository = new CacheOrderRepository(testAppDataSource.getRepository(CacheMatchedOrder));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(CacheMatchedOrder);
});

describe("create 테스트", () => {
  test("통과하는 테스트", async () => {
    const orderId = 1;

    await cacheOrderRepository.create(orderId);

    const order = await testAppDataSource.manager.findOneBy(CacheMatchedOrder, { id: orderId });

    expect(order?.id).toBe(orderId);
    expect(order?.date).not.toBeFalsy();
  });
});
