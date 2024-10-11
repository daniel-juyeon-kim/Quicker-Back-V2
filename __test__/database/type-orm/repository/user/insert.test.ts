import { BirthDate, JoinDate, ProfileImage, User, UserRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const userRepository = new UserRepository(testAppDataSource.getRepository(User));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
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

    const birthDate = {
      id: userId,
      date: new Date(2000, 9, 12),
    };

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
});
