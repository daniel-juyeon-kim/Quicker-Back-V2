import { initializeDataSource } from "../../../../../database/type-orm";
import { BirthDate } from "../../../../../database/type-orm/entity/birth-date.entity";
import { Image } from "../../../../../database/type-orm/entity/image.entity";
import { JoinDate } from "../../../../../database/type-orm/entity/join-date.entity";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../../data-source";

const userRepository = new UserRepository(testAppDataSource);
const hash = "아이디";
const user = {
  id: hash,
  wallet_address: "지갑주소",
  name: "이름",
  email: "이메일",
  contact: "연락처",
};
const birthDate = {
  id: hash,
  year: 2000,
  month: 9,
  date: 12,
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

afterEach(async () => {
  await testAppDataSource.manager.delete(Image, "아이디");
  await testAppDataSource.manager.delete(BirthDate, "아이디");
  await testAppDataSource.manager.delete(JoinDate, "아이디");
});

describe("register 테스트", () => {
  test("정상흐름", async () => {
    await expect(testAppDataSource.manager.existsBy(User, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(Image, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(BirthDate, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(JoinDate, { id: hash })).resolves.toBe(false);

    await userRepository.createUser({ user, birthDate, hash });

    await expect(testAppDataSource.manager.existsBy(User, { id: hash })).resolves.toBe(true);
    await expect(testAppDataSource.manager.existsBy(Image, { id: hash })).resolves.toBe(true);
    await expect(testAppDataSource.manager.existsBy(BirthDate, { id: hash })).resolves.toBe(true);
    await expect(testAppDataSource.manager.existsBy(JoinDate, { id: hash })).resolves.toBe(true);
  });
});
