import { User } from "../../../../../database/type-orm/entity/user.entity";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { initializeDataSource, testAppDataSource } from "../data-source";
const userRepository = new UserRepository(testAppDataSource);
const hash = "아이디";
const user = {
  id: hash,
  walletAddress: "지갑주소",
  name: "이름",
  email: "이메일",
  contact: "연락처",
};
const birthDate = {
  id: hash,
  date: new Date(2000, 9, 12).toLocaleDateString(),
};

const createUser = async () => {
  await userRepository.createUser({ user, birthDate, hash });
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
  test("정상흐름", async () => {
    await expect(userRepository.findIdByWalletAddress("지갑주소")).resolves.toEqual({ id: "아이디" });
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findIdByWalletAddress("잘못된_지갑주소")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});

describe("findNameByWalletAddress 테스트", () => {
  test("정상흐름", async () => {
    await expect(userRepository.findNameByWalletAddress("지갑주소")).resolves.toEqual({ name: "이름" });
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findNameByWalletAddress("잘못된_지갑주소")).rejects.toThrow(
      "데이터를 찾지 못했습니다.",
    );
  });
});
