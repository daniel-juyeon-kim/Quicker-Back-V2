import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Child } from "./entity/child.entity";
import { GrandParent } from "./entity/grandparent.entity";
import { Parent } from "./entity/parent.entity";

const dataSource = createStudyDataSource(__dirname);

const family = {
  familyName: "가족이름",
  name: "조상",
  parent: {
    name: "부모",
    child: {
      familyName: "가족이름",
      name: "자식",
    },
  },
};

const createFamily = async () => {
  const grandParentFamily = dataSource.manager.create(GrandParent, family);
  await dataSource.manager.save(GrandParent, grandParentFamily);
};

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

beforeEach(async () => {
  await createFamily();
});

describe("1:1 연속 cascade 테스트", () => {
  test("삭제 테스트 ", async () => {
    // 최하위 엔티티 제거로 최상위 엔티티까지 전부 제거
    await dataSource.manager.delete(Child, { name: "자식" });

    await expect(dataSource.manager.existsBy(Child, { familyName: "가족이름" })).resolves.toBe(false);
    await expect(dataSource.manager.existsBy(Parent, { familyName: "가족이름" })).resolves.toBe(false);
    await expect(dataSource.manager.existsBy(GrandParent, { familyName: "가족이름" })).resolves.toBe(false);
  });
});
