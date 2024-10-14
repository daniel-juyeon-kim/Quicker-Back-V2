import { DataBaseError, NotExistDataError, ProfileImage, User } from "../../../../../database/type-orm";
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

describe("updateUserProfileImageIdByWalletAddress 테스트", () => {
  test("통과하는 테스트", async () => {
    const walletAddress = "지갑주소";

    const findProfileImageId = async (walletAddress: string) => {
      const profileImage = await testAppDataSource.manager.findOne(ProfileImage, {
        relations: { user: true },
        where: { user: { walletAddress } },
        select: {
          id: true,
          imageId: true,
          user: {},
        },
      });

      return { imageId: profileImage?.imageId };
    };

    await expect(findProfileImageId(walletAddress)).resolves.toEqual({ imageId: "111" });

    const body = { walletAddress, imageId: "100" };

    await userRepository.updateUserProfileImageIdByWalletAddress(body);

    await expect(findProfileImageId(walletAddress)).resolves.toEqual({ imageId: "100" });
  });

  test("실패하는 테스트, 존재하지 않는 지갑주소", async () => {
    const body = { walletAddress: "존재하지 않는 지갑주소", imageId: "100" };

    await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toBeInstanceOf(DataBaseError);
    await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toBeInstanceOf(
      NotExistDataError,
    );
    await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toThrow(
      "존재하지 않는 지갑주소에 대응되는 데이터가 존재하지 않습니다.",
    );
  });
});
