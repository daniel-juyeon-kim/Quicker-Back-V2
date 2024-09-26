import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Order } from "./entity/order.entity";
import { Product } from "./entity/product.entity";

const dataSource = createStudyDataSource(__dirname);

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

describe("양방향 1:1 저장 테스트", () => {
  test("Product로 저장하는 테스트", async () => {
    const order = {
      id: 1,
    };
    const product = {
      id: 1,
      name: "상품 이름",
    };

    const productEntity = dataSource.manager.create(Product, { ...product, order });

    // order가 상위 product가 하위 엔티티 이지만 양방향 1:1 관계를 설정하고 cascade를 설정하면 product로 order를 한번에 저장할 수 있다.
    await dataSource.manager.save(Product, productEntity);

    await expect(dataSource.manager.exists(Product)).resolves.toBe(true);
    await expect(dataSource.manager.exists(Order)).resolves.toBe(true);
  });
});
