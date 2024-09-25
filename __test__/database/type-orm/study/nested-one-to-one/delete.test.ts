import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../data-source";
import { Child } from "./entity/child.entity";
import { GrandParent } from "./entity/grandparent.entity";
import { Parent } from "./entity/parent.entity";

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

export const createFamily = async () => {
  const grandParentFamily = studyDataSource.manager.create(GrandParent, family);
  await studyDataSource.manager.save(GrandParent, grandParentFamily);
};

export const removeFamily = async () => {
  await studyDataSource.manager.clear(Child);
};

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

beforeEach(async () => {
  await createFamily();
});

describe("1:1 연속 cascade 테스트", () => {
  test("삭제 테스트 ", async () => {
    // 최하위 엔티티 제거로 최상위 엔티티까지 전부 제거
    await studyDataSource.manager.delete(Child, { name: "자식" });

    await expect(studyDataSource.manager.existsBy(Child, { familyName: "가족이름" })).resolves.toBe(false);
    await expect(studyDataSource.manager.existsBy(Parent, { familyName: "가족이름" })).resolves.toBe(false);
    await expect(studyDataSource.manager.existsBy(GrandParent, { familyName: "가족이름" })).resolves.toBe(false);
  });
});
