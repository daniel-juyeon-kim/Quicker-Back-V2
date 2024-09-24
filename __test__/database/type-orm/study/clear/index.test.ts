import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../connector/data-source";
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

describe("Name of the group", () => {
  test("should ", async () => {
    await expect(studyDataSource.manager.count(Clear)).resolves.toEqual(3);
    await studyDataSource.manager.clear(Clear);
    await expect(studyDataSource.manager.exists(Clear)).resolves.toEqual(false);
  });
});
