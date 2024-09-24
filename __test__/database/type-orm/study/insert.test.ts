import { initializeDataSource } from "../../../../database/type-orm";
import { studyDataSource } from "./connector/data-source";
import { Child } from "./entity/child.entity";
import { GrandParent } from "./entity/grandparent.entity";
import { Parent } from "./entity/parent.entity";
import { Profile } from "./entity/profile.entity";
import { UserMetaData } from "./entity/user-meta-data.entity";
import { User } from "./entity/user.entity";

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

afterAll(async () => {
  await studyDataSource.manager.delete(User, { name: "이름" });
  await studyDataSource.manager.delete(UserMetaData, { isLogin: true });
  await studyDataSource.manager.delete(Child, "가족이름");
});

describe("cascade save 테스트", () => {
  test("정상흐름", async () => {
    const metaData = {
      isLogin: true,
    };
    const profile = {
      gender: "성별",
      photo: "photo image",
    };
    const userLike = {
      id: 1,
      name: "이름",
      profile,
      metaData,
    };

    const userEntity = studyDataSource.manager.create(User, userLike);

    await studyDataSource.manager.save(User, userEntity);

    await expect(studyDataSource.manager.existsBy(User, { id: 1 })).resolves.toBe(true);
    await expect(studyDataSource.manager.existsBy(Profile, { id: 1 })).resolves.toBe(true);
    await expect(studyDataSource.manager.existsBy(UserMetaData, { id: 1 })).resolves.toBe(true);
  });
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
