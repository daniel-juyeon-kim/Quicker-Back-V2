import { initializeDataSource } from "../../../../../database/type-orm";
import { BirthDate } from "../../../../../database/type-orm/entity/birth-date.entity";
import { Image } from "../../../../../database/type-orm/entity/image.entity";
import { JoinDate } from "../../../../../database/type-orm/entity/join-date.entity";
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

const createUser = async () => {
  await userRepository.createUser({ user, birthDate, hash });
};

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await createUser();
});

afterEach(async () => {
  await testAppDataSource.manager.delete(Image, "아이디");
  await testAppDataSource.manager.delete(BirthDate, "아이디");
  await testAppDataSource.manager.delete(JoinDate, "아이디");
});

describe("findIdByWalletAddress 테스트", () => {
  test("정상흐름", async () => {
    await expect(userRepository.findIdByWalletAddress("지갑주소")).resolves.toEqual("아이디");
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findIdByWalletAddress("잘못된_지값주소")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});

describe("findNameByWalletAddress 테스트", () => {
  test("정상흐름", async () => {
    await expect(userRepository.findNameByWalletAddress("지갑주소")).resolves.toEqual("이름");
  });

  test("존재하지 않는 데이터에 접근", async () => {
    await expect(userRepository.findNameByWalletAddress("잘못된_지값주소")).rejects.toThrow(
      "데이터를 찾지 못했습니다.",
    );
  });
});
