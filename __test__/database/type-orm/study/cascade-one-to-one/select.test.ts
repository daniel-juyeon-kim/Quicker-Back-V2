import { initializeDataSource } from "../../../../../database/type-orm";
import { createStudyDataSource } from "../data-source";
import { User } from "./entity/user.entity";

const dataSource = createStudyDataSource(__dirname);

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
  const userEntity = dataSource.manager.create(User, user);
  await dataSource.manager.save(User, userEntity);
};

beforeAll(async () => {
  await initializeDataSource(dataSource);
});

beforeEach(async () => {
  await createUser();
});

describe("find", () => {
  describe("findOne 테스트", () => {
    test("정상흐름", async () => {
      const user = await dataSource.manager.findOne(User, {
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
      const user = await dataSource.manager.findOne(User, {
        relations: { profile: true, metaData: true },
        where: { id: 5 },
      });

      expect(user).toBe(null);
    });
  });
});
