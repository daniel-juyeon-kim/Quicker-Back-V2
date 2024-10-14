import { BirthDate, DataBaseError, JoinDate, ProfileImage, User } from "../../../../../database";
import { UserRepositoryImpl } from "../../../../../database/type-orm/repository/impl/user/user.repository.impl";
import { initializeDataSource, testAppDataSource } from "../data-source";

const userRepository = new UserRepositoryImpl(testAppDataSource.getRepository(User));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(User);
});

describe("createUser 테스트", () => {
  test("통과하는 테스트", async () => {
    const userId = "아이디";

    await expect(testAppDataSource.manager.existsBy(User, { id: userId })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(ProfileImage, { id: userId })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(BirthDate, { id: userId })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(JoinDate, { id: userId })).resolves.toBe(false);

    const user = {
      id: userId,
      walletAddress: "지갑주소",
      name: "이름",
      email: "이메일",
      contact: "연락처",
    };

    const birthDate = new Date(2000, 9, 12);

    await userRepository.createUser({ user, birthDate, id: userId });

    const userInstance = await testAppDataSource.manager.findOne(User, {
      relations: {
        profileImage: true,
        birthDate: true,
        joinDate: true,
      },
      where: { id: userId },
    });

    expect(userInstance).not.toBeFalsy();
    expect(userInstance?.profileImage).not.toBeFalsy();
    expect(userInstance?.birthDate).not.toBeFalsy();
    expect(userInstance?.joinDate).not.toBeFalsy();
  });

  test("실패하는 테스트, 이미 존재하는 아이디", async () => {
    const userId = "아이디";
    const user = {
      id: userId,
      walletAddress: "지갑주소",
      name: "이름",
      email: "이메일",
      contact: "연락처",
    };

    const birthDate = new Date(2000, 9, 12);

    await expect(userRepository.createUser({ user, birthDate, id: userId })).resolves.not.toThrow();
    await expect(userRepository.createUser({ user, birthDate, id: userId })).rejects.toBeInstanceOf(DataBaseError);
    await expect(userRepository.createUser({ user, birthDate, id: userId })).rejects.toThrow(
      "아이디에 해당하는 데이터가 이미 존재합니다.",
    );
  });
});
