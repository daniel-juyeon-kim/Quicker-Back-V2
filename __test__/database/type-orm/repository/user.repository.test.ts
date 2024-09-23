import { User } from "../../../../database/type-orm/entity/user.entity";
import { UserRepository } from "../../../../database/type-orm/repository/impl/user.repository";
import { testAppDataSource } from "../data-source";
import initializeDataSourceConnection from "../setup-connection";

beforeAll(async () => {
  if (testAppDataSource.isInitialized) {
    return;
  }
  await initializeDataSourceConnection();
});

afterAll(async () => {
  const user = testAppDataSource.manager.create(User, { id: "아이디" });
  await testAppDataSource.manager.remove(User, user);
});

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

describe("register 테스트", () => {
  test("정상흐름", async () => {
    await userRepository.createUser({ user, birthDate, hash });
    const result = await testAppDataSource.manager.findOne(User, {
      relations: { birthDate: true },
      where: { id: hash },
    });

    expect(result).toMatchObject(user);
    expect(result?.birthDate).toMatchObject(birthDate);
  });
});

describe("findIdByWalletAddress 테스트", () => {
  test("정상흐름", async () => {
    const id = await userRepository.findIdByWalletAddress("지갑주소");

    expect(id).toEqual("아이디");
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findIdByWalletAddress("잘못된_지값주소")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});

describe("findNameByWalletAddress 테스트", () => {
  test("정상흐름", async () => {
    const id = await userRepository.findNameByWalletAddress("지갑주소");

    expect(id).toEqual("이름");
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findNameByWalletAddress("잘못된_지값주소")).rejects.toThrow(
      "데이터를 찾지 못했습니다.",
    );
  });
});
