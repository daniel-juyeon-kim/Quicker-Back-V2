import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Clear } from "./clear.entity";

const dataSource = createStudyDataSource(__dirname);

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

beforeEach(async () => {
  await Promise.allSettled([
    dataSource.manager.save(Clear, { name: "이름" }),
    dataSource.manager.save(Clear, { name: "이름" }),
    dataSource.manager.save(Clear, { name: "이름" }),
  ]);
});

describe("clear 학습 테스트", () => {
  test("정상흐름", async () => {
    await expect(dataSource.manager.count(Clear)).resolves.toEqual(3);

    await dataSource.manager.clear(Clear);

    await expect(dataSource.manager.exists(Clear)).resolves.toEqual(false);
  });
});
