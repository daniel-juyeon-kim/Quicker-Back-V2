import { ImageRepository } from "../../../../../database/type-orm/repository/impl/image.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { initializeDataSource, testAppDataSource } from "../data-source";

const hash = "아이디";
const birthDate = {
  id: hash,
  date: new Date(2000, 9, 12).toLocaleDateString(),
};
const user = {
  id: hash,
  walletAddress: "지갑주소",
  name: "이름",
  email: "이메일@gmail.com",
  contact: "연락처",
};
const userRepository = new UserRepository(testAppDataSource);
const imageRepository = new ImageRepository(testAppDataSource);

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await userRepository.createUser({ user, birthDate, hash });
});

describe("findImageIdByUserId 테스트", () => {
  test("정상흐름", async () => {
    await expect(imageRepository.findImageIdByUserId("아이디")).resolves.toEqual({ imageId: "404" });
  });
});
