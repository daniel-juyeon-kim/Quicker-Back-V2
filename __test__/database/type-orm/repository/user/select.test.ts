import { User, UserRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const userRepository = new UserRepository(testAppDataSource.getRepository(User));

const createUser = async () => {
  const user = testAppDataSource.manager.create(User, {
    id: "아이디",
    walletAddress: "지갑주소",
    name: "이름",
    email: "이메일",
    contact: "연락처",
    birthDate: {
      id: "아이디",
      date: new Date(2000, 9, 12).toISOString(),
    },
    profileImage: {
      id: "아이디",
      imageId: "111",
    },
    joinDate: {
      id: "아이디",
      date: new Date(2023, 9, 12).toISOString(),
    },
  });

  await testAppDataSource.manager.save(User, user);
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await createUser();
});

afterEach(async () => {
  await testAppDataSource.manager.clear(User);
});

describe("findIdByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(userRepository.findIdByWalletAddress("지갑주소")).resolves.toEqual({ id: "아이디" });
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findIdByWalletAddress("잘못된_지갑주소")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});

describe("findNameByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(userRepository.findNameByWalletAddress("지갑주소")).resolves.toEqual({ name: "이름" });
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findNameByWalletAddress("잘못된_지갑주소")).rejects.toThrow(
      "데이터를 찾지 못했습니다.",
    );
  });
});
