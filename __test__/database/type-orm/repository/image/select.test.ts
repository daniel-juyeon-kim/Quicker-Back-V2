import { ProfileImage, ProfileImageRepository, User, UserRepository } from "../../../../../database/type-orm";
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

describe("findImageIdByUserId 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(imageRepository.findProfileImageIdByUserId(USER_ID)).resolves.toEqual({ imageId: "404" });
  });

  test("실패하는 테스트, 존재하지 않는 사용자 아이디 입력", async () => {
    await expect(imageRepository.findProfileImageIdByUserId("40")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});
