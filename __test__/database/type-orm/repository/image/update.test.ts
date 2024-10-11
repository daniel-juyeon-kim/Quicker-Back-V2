import { ProfileImage, User } from "../../../../../database/type-orm";
import { ProfileImageRepository } from "../../../../../database/type-orm/repository/impl/image.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { initializeDataSource, testAppDataSource } from "../data-source";

const USER_ID = "아이디";

const userRepository = new UserRepository(testAppDataSource.getRepository(User));
const imageRepository = new ProfileImageRepository(testAppDataSource.getRepository(ProfileImage));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  const birthDate = {
    id: USER_ID,
    date: new Date(2000, 9, 12),
  };
  const user = {
    id: USER_ID,
    walletAddress: "지갑주소",
    name: "이름",
    email: "이메일@gmail.com",
    contact: "연락처",
  };
  await userRepository.createUser({ user, birthDate, id: USER_ID });
});

describe("updateImageIdByUserId 테스트", () => {
  test("통과하는 테스트", async () => {
    const profileImageId = "100";

    await imageRepository.updateProfileImageIdByUserId(USER_ID, profileImageId);

    await expect(imageRepository.findProfileImageIdByUserId(USER_ID)).resolves.toEqual({ imageId: profileImageId });
  });
});
