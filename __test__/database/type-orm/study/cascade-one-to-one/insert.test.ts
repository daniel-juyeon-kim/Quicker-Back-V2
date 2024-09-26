import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { Child } from "../nested-one-to-one/entity/child.entity";
import { Profile } from "./entity/profile.entity";
import { UserMetaData } from "./entity/user-meta-data.entity";
import { User } from "./entity/user.entity";

const dataSource = createStudyDataSource(__dirname);

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

afterEach(async () => {
  await Promise.allSettled([dataSource.manager.clear(UserMetaData), dataSource.manager.clear(Child)]);
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

    const userEntity = dataSource.manager.create(User, userLike);

    await dataSource.manager.save(User, userEntity);

    await expect(dataSource.manager.existsBy(User, { id: 1 })).resolves.toBe(true);
    await expect(dataSource.manager.existsBy(Profile, { id: 1 })).resolves.toBe(true);
    await expect(dataSource.manager.existsBy(UserMetaData, { id: 1 })).resolves.toBe(true);
  });

  test("cascade조건을 만족하지 않아 실패하는 테스트", async () => {
    const profile = {
      gender: "성별",
      photo: "photo image",
    };
    const userLike = {
      id: 1,
      name: "이름",
      profile,
    };

    const userEntity = dataSource.manager.create(User, userLike);

    await expect(dataSource.manager.save(User, userEntity)).rejects.toThrow(
      "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed",
    );
  });
});
