import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Child } from "./entity/child.entity";
import { GrandParent } from "./entity/grandparent.entity";
import { Parent } from "./entity/parent.entity";

const dataSource = createStudyDataSource(__dirname);

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

describe("1:1 연속 cascade save 테스트", () => {
  test("정상흐름", async () => {
    // 수동으로 pk를 설정하는경우 관계의 최상위 엔티티와 최하위 엔티티의 pk를 직접 설정해줘야 함
    const grandParentFamily = dataSource.manager.create(GrandParent, {
      familyName: "가족이름",
      name: "조상",
      parent: {
        name: "부모",
        child: {
          familyName: "가족이름",
          name: "자식",
        },
      },
    });

    // 최하위 엔티티를 제거하면 cascade된 최상위 엔티티까지 전부 제거됨
    await dataSource.manager.save(GrandParent, grandParentFamily);

    await expect(dataSource.manager.existsBy(Child, { familyName: "가족이름" })).resolves.toBe(true);
    await expect(dataSource.manager.existsBy(Parent, { familyName: "가족이름" })).resolves.toBe(true);
    await expect(dataSource.manager.existsBy(GrandParent, { familyName: "가족이름" })).resolves.toBe(true);
  });
});
