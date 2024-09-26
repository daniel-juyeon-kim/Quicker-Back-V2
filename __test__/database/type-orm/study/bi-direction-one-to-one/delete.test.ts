import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Order } from "./entity/order.entity";
import { Product } from "./entity/product.entity";

const dataSource = createStudyDataSource(__dirname);

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

beforeEach(async () => {
  const order = {
    id: 1,
  };
  const product = {
    id: 1,
    name: "상품 이름",
  };

  const orderEntity = dataSource.manager.create(Order, { ...order, product });

  await dataSource.manager.save(Order, orderEntity);
});

describe("양방향 1:1 cascade delete 테스트", () => {
  test("상위 엔티티로 연관관계인 하위 엔티티 삭제 테스트", async () => {
    const order = await dataSource.manager.findOne(Order, {
      relations: {
        product: true,
      },
      where: { id: 1 },
    });

    await dataSource.manager.remove(Order, order);

    await expect(dataSource.manager.exists(Order)).resolves.toBe(false);
    // delete가 아닌 remove를 사용해도 상위 엔티티에서 하위 엔티티 삭제는 불가능 함
    await expect(dataSource.manager.exists(Product)).resolves.toBe(true);
  });
});
