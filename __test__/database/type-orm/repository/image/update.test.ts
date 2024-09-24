import { initializeDataSource } from "../../../../../database/type-orm";
import { BirthDate } from "../../../../../database/type-orm/entity/birth-date.entity";
import { Image } from "../../../../../database/type-orm/entity/image.entity";
import { JoinDate } from "../../../../../database/type-orm/entity/join-date.entity";
import { ImageRepository } from "../../../../../database/type-orm/repository/impl/image.repository";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../../data-source";

const hash = "아이디";
const birthDate = {
  id: hash,
  year: 2000,
  month: 9,
  date: 12,
};
const user = {
  id: hash,
  wallet_address: "지갑주소",
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

afterEach(async () => {
  await testAppDataSource.manager.delete(Image, "아이디");
  await testAppDataSource.manager.delete(BirthDate, "아이디");
  await testAppDataSource.manager.delete(JoinDate, "아이디");
});

describe("updateImageIdByUserId 테스트", () => {
  test("정상흐름", async () => {
    await imageRepository.updateImageIdByUserId("아이디", "100");

    await expect(imageRepository.findImageIdByUserId("아이디")).resolves.toEqual({ imageId: "100" });
  });
});
