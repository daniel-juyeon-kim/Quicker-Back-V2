import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../data-source";
import { Child } from "../nested-one-to-one/entity/child.entity";
import { Profile } from "./entity/profile.entity";
import { UserMetaData } from "./entity/user-meta-data.entity";
import { User } from "./entity/user.entity";

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

afterAll(async () => {
  await Promise.allSettled([
    studyDataSource.manager.delete(User, { name: "이름" }),
    studyDataSource.manager.delete(UserMetaData, { isLogin: true }),
    studyDataSource.manager.delete(Child, "가족이름"),
  ]);
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
