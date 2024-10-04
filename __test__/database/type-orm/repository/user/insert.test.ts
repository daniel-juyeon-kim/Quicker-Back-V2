import { initializeDataSource } from "../../../../../database/type-orm";
import { BirthDate } from "../../../../../database/type-orm/entity/birth-date.entity";
import { Image } from "../../../../../database/type-orm/entity/image.entity";
import { JoinDate } from "../../../../../database/type-orm/entity/join-date.entity";
import { User } from "../../../../../database/type-orm/entity/user.entity";
import { UserRepository } from "../../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";

const userRepository = new UserRepository(testAppDataSource);

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

describe("createUser 테스트", () => {
  test("정상흐름", async () => {
    const hash = "아이디";
    const user = {
      id: hash,
      walletAddress: "지갑주소",
      name: "이름",
      email: "이메일",
      contact: "연락처",
    };
    const birthDate = {
      id: hash,
      date: new Date(2000, 9, 12).toLocaleDateString(),
    };

    await expect(testAppDataSource.manager.existsBy(User, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(Image, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(BirthDate, { id: hash })).resolves.toBe(false);
    await expect(testAppDataSource.manager.existsBy(JoinDate, { id: hash })).resolves.toBe(false);

    await userRepository.createUser({ user, birthDate, hash });

    const userInstance = await testAppDataSource.manager.findOne(User, {
      relations: {
        image: true,
        birthDate: true,
        joinDate: true,
      },
      where: { id: hash },
    });

    expect(userInstance).not.toBeFalsy();
    expect(userInstance?.image).not.toBeFalsy();
    expect(userInstance?.birthDate).not.toBeFalsy();
    expect(userInstance?.joinDate).not.toBeFalsy();
  });
});
