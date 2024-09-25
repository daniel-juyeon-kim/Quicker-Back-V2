import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../data-source";
import { Clear } from "./clear.entity";

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

beforeEach(async () => {
  await Promise.allSettled([
    studyDataSource.manager.save(Clear, { name: "이름" }),
    studyDataSource.manager.save(Clear, { name: "이름" }),
    studyDataSource.manager.save(Clear, { name: "이름" }),
  ]);
});

afterEach(async () => {
  await studyDataSource.manager.clear(Clear);
});

describe("clear 학습 테스트", () => {
  test("정상흐름", async () => {
    await expect(studyDataSource.manager.count(Clear)).resolves.toEqual(3);
    await studyDataSource.manager.clear(Clear);
    await expect(studyDataSource.manager.exists(Clear)).resolves.toEqual(false);
  });
});
