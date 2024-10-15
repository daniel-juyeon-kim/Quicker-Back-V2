import { mock, mockReset } from "jest-mock-extended";
import { KeyCreator } from "../../../core/key-creator";

import { DuplicatedDataError, NotExistDataError } from "../../../database";
import { UserRepository } from "../../../database/type-orm/repository/impl/user/user.repository";
import { UserServiceImpl } from "../../../service/user/user-service-impl";

const repository = mock<UserRepository>();
const service = new UserServiceImpl(repository);

beforeEach(async () => {
  mockReset(repository);
});

describe("UserServiceImpl 테스트", () => {
  describe("registerUser 테스트", () => {
    const body = {
      User: {
        wallet_address: "지갑주소",
        name: "이름",
        email: "이메일",
        contact: "연락처",
      },
      Birthday: {
        year: 2000,
        month: 0,
        date: 1,
      },
    };
    const keyCreator = mock<KeyCreator>();

    test("통과하는 테스트", async () => {
      await service.registerUser(body, keyCreator);

      expect(repository.createUser).toHaveBeenCalledWith({
        id: undefined,
        birthDate: new Date(2000, 0, 1, 0, 0, 0, 0),
        user: {
          contact: "연락처",
          email: "이메일",
          name: "이름",
          walletAddress: "지갑주소",
          wallet_address: "지갑주소",
        },
      });
    });

    test("실패하는 테스트, 중복 회원 가입", async () => {
      await service.registerUser(body, keyCreator);

      expect(repository.createUser).toHaveBeenCalledWith({
        id: undefined,
        birthDate: new Date(2000, 0, 1, 0, 0, 0, 0),
        user: {
          contact: "연락처",
          email: "이메일",
          name: "이름",
          walletAddress: "지갑주소",
          wallet_address: "지갑주소",
        },
      });

      const ERROR_MESSAGE = `에 해당하는 데이터가 이미 존재합니다.`;
      repository.createUser.mockRejectedValue(new DuplicatedDataError(ERROR_MESSAGE));

      await expect(service.registerUser(body, keyCreator)).rejects.toBeInstanceOf(DuplicatedDataError);
      expect(repository.createUser).toHaveBeenCalledTimes(2);

      await expect(service.registerUser(body, keyCreator)).rejects.toThrow(ERROR_MESSAGE);
      expect(repository.createUser).toHaveBeenCalledTimes(3);
    });

    test("실패하는 테스트", async () => {
      const body = {
        User: {
          wallet_address: "지갑주소",
          name: "이름",
          email: "이메일",
          contact: "연락처",
        },
        Birthday: {
          year: 2000,
          month: 0,
          date: 1,
        },
      };

      const keyCreator = mock<KeyCreator>();
      await service.registerUser(body, keyCreator);

      expect(repository.createUser).toHaveBeenCalledWith({
        id: undefined,
        birthDate: new Date(2000, 0, 1, 0, 0, 0, 0),
        user: {
          contact: "연락처",
          email: "이메일",
          name: "이름",
          walletAddress: "지갑주소",
          wallet_address: "지갑주소",
        },
      });
    });
  });

  describe("findUserNameByWalletAddress 테스트", () => {
    test("통과하는 테스트", async () => {
      const walletAddress = "지갑주소";
      const expectReturnValue = { name: "이름" };
      repository.findNameByWalletAddress.mockResolvedValue(expectReturnValue);

      await expect(service.findUserNameByWalletAddress(walletAddress)).resolves.toEqual(expectReturnValue);
      expect(repository.findNameByWalletAddress).toHaveBeenCalledWith("지갑주소");
    });

    test("실패하는 테스트, 존재하지 않는 지갑주소", async () => {
      const walletAddress = "존재하지 않는 지갑주소";

      const ERROR_MESSAGE = `지갑주소 ${walletAddress}에 대응되는 데이터가 존재하지 않습니다.`;
      repository.findNameByWalletAddress.mockRejectedValue(new NotExistDataError(ERROR_MESSAGE));

      await expect(service.findUserNameByWalletAddress(walletAddress)).rejects.toBeInstanceOf(NotExistDataError);
      expect(repository.findNameByWalletAddress).toHaveBeenCalledTimes(1);

      await expect(service.findUserNameByWalletAddress(walletAddress)).rejects.toThrow(ERROR_MESSAGE);
      expect(repository.findNameByWalletAddress).toHaveBeenCalledTimes(2);
    });
  });

  describe("getUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const walletAddress = "지갑주소";
      const expectReturnValue = { imageId: "300" };
      repository.findUserProfileImageIdByWalletAddress.mockResolvedValue(expectReturnValue);

      const imageId = await service.getUserImageId(walletAddress);

      expect(imageId).toEqual(expectReturnValue);
      expect(repository.findUserProfileImageIdByWalletAddress).toHaveBeenCalledWith(walletAddress);
    });

    test("실패하는 테스트, 존재하지 않는 지갑주소", async () => {
      const walletAddress = "존재하지 않는 지갑주소";
      repository.findUserProfileImageIdByWalletAddress.mockRejectedValue(new NotExistDataError(""));

      await expect(service.getUserImageId(walletAddress)).rejects.toThrow(NotExistDataError);
    });
  });

  describe("putUserImageId 테스트", () => {
    test("통과하는 테스트", async () => {
      const body = { walletAddress: "지갑주소", imageId: "100" };

      await service.putUserImageId(body);

      expect(repository.updateUserProfileImageIdByWalletAddress).toHaveBeenCalledWith(body);
    });

    test("실패하는 테스트, 존재하지 않는 지갑주소", async () => {
      const body = { walletAddress: "존재하지 않는 지갑주소", imageId: "100" };
      repository.updateUserProfileImageIdByWalletAddress.mockRejectedValue(new NotExistDataError(""));

      await expect(service.putUserImageId(body)).rejects.toThrow(NotExistDataError);
    });
  });
});
