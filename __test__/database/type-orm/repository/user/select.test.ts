import { NotExistDataError, User } from "../../../../../database/type-orm";
import { UserRepositoryImpl } from "../../../../../database/type-orm/repository/impl/user/user.repository.impl";
import { initializeDataSource, testAppDataSource } from "../data-source";

const userRepository = new UserRepositoryImpl(testAppDataSource.getRepository(User));

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

describe("findNameByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(userRepository.findNameByWalletAddress("지갑주소")).resolves.toEqual({ name: "이름" });
  });

  test("실패하는 테스트, 존재하지 않는 데이터에 접근", async () => {
    const walletAddress = "잘못된_지갑주소";

    await expect(userRepository.findNameByWalletAddress(walletAddress)).rejects.toBeInstanceOf(NotExistDataError);
    await expect(userRepository.findNameByWalletAddress(walletAddress)).rejects.toThrow(
      "지갑주소 잘못된_지갑주소에 대응되는 데이터가 존재하지 않습니다.",
    );
  });
});

describe("findUserProfileImageIdByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(userRepository.findUserProfileImageIdByWalletAddress("지갑주소")).resolves.toEqual({ imageId: "111" });
  });

  test("실패하는 테스트, 존재하지 않는 데이터에 접근", async () => {
    const walletAddress = "잘못된_지갑주소";

    await expect(userRepository.findUserProfileImageIdByWalletAddress(walletAddress)).rejects.toBeInstanceOf(
      NotExistDataError,
    );
    await expect(userRepository.findUserProfileImageIdByWalletAddress(walletAddress)).rejects.toThrow(
      "지갑주소 잘못된_지갑주소에 대응되는 데이터가 존재하지 않습니다.",
    );
  });
});
