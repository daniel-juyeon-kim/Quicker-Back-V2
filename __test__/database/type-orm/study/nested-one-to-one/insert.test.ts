import { initializeDataSource } from "../../../../../database/type-orm";
import { UserMetaData } from "../cascade-one-to-one/entity/user-meta-data.entity";
import { User } from "../cascade-one-to-one/entity/user.entity";
import { studyDataSource } from "../data-source";
import { Child } from "./entity/child.entity";
import { GrandParent } from "./entity/grandparent.entity";
import { Parent } from "./entity/parent.entity";

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

afterAll(async () => {
  await Promise.allSettled([
    studyDataSource.manager.clear(User),
    studyDataSource.manager.clear(UserMetaData),
    studyDataSource.manager.clear(Child),
  ]);
});

describe("1:1 연속 cascade save 테스트", () => {
  test("정상흐름", async () => {
    // 수동으로 pk를 설정하는경우 관계의 최상위 엔티티와 최하위 엔티티의 pk를 직접 설정해줘야 함
    const grandParentFamily = studyDataSource.manager.create(GrandParent, {
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
    await studyDataSource.manager.save(GrandParent, grandParentFamily);

    await expect(studyDataSource.manager.existsBy(Child, { familyName: "가족이름" })).resolves.toBe(true);
    await expect(studyDataSource.manager.existsBy(Parent, { familyName: "가족이름" })).resolves.toBe(true);
    await expect(studyDataSource.manager.existsBy(GrandParent, { familyName: "가족이름" })).resolves.toBe(true);
  });
});
