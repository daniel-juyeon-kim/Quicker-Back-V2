import { UserRepositoryImpl } from "../../../../../database/type-orm/repository/impl/user/user.repository.impl";

import { BirthDate, DataBaseError, JoinDate, NotExistDataError, ProfileImage, User } from "../../../../../database";
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

afterEach(async () => {
  await testAppDataSource.manager.clear(User);
});

describe("UserRepository 테스트", () => {
  describe("insert", () => {
    describe("create 테스트", () => {
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

        await userRepository.create({ user, birthDate, id: userId });

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

        await expect(userRepository.create({ user, birthDate, id: userId })).resolves.not.toThrow();
        await expect(userRepository.create({ user, birthDate, id: userId })).rejects.toBeInstanceOf(DataBaseError);
        await expect(userRepository.create({ user, birthDate, id: userId })).rejects.toThrow(
          "아이디에 해당하는 데이터가 이미 존재합니다.",
        );
      });
    });
  });

  describe("select", () => {
    beforeEach(async () => {
      await createUser();
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
        await expect(userRepository.findUserProfileImageIdByWalletAddress("지갑주소")).resolves.toEqual({
          imageId: "111",
        });
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
  });

  describe("update", () => {
    beforeEach(async () => {
      await createUser();
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

        await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toBeInstanceOf(
          DataBaseError,
        );
        await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toBeInstanceOf(
          NotExistDataError,
        );
        await expect(userRepository.updateUserProfileImageIdByWalletAddress(body)).rejects.toThrow(
          "존재하지 않는 지갑주소에 대응되는 데이터가 존재하지 않습니다.",
        );
      });
    });
  });
});
