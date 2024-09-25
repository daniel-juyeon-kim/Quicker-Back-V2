import { initializeDataSource } from "../../../../../database/type-orm";
import { studyDataSource } from "../data-source";
import { Profile } from "./entity/profile.entity";
import { UserMetaData } from "./entity/user-meta-data.entity";
import { User } from "./entity/user.entity";

const user = {
  id: 1,
  name: "이름",
  profile: {
    gender: "성별",
    photo: "photo image",
  },
  metaData: {
    isLogin: true,
  },
};

const createUser = async () => {
  const userEntity = studyDataSource.manager.create(User, user);
  await studyDataSource.manager.save(User, userEntity);
};

const removeUser = async () => {
  await studyDataSource.manager.delete(Profile, { gender: "성별" });
  await studyDataSource.manager.delete(UserMetaData, { isLogin: true });
};

beforeAll(async () => {
  await initializeDataSource(studyDataSource);
});

beforeEach(async () => {
  await createUser();
});

afterEach(async () => {
  await removeUser();
});

describe("find", () => {
  describe("findOne 테스트", () => {
    test("정상흐름", async () => {
      const user = await studyDataSource.manager.findOne(User, {
        relations: { profile: true, metaData: true },
        where: { id: 1 },
      });

      expect(user).toEqual({
        id: 1,
        name: "이름",
        profile: {
          id: 1,
          gender: "성별",
          photo: "photo image",
        },
        metaData: { id: 1, isLogin: true },
      });
    });

    test("존재하지 않는 데이터 조회", async () => {
      const user = await studyDataSource.manager.findOne(User, {
        relations: { profile: true, metaData: true },
        where: { id: 5 },
      });

      expect(user).toBe(null);
    });
  });
});
