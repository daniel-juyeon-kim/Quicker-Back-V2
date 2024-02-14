import CreateUser from "../../Maria/Commands/CreateUser";
import {
  Birth_date,
  Join_date,
  User,
  initModels,
} from "../../Maria/Models/init-models";
import { cryptoUserInfo } from "../../service/cryptoUserInfo";
import { sequelize } from "../connectors/sequelizeConnector";

describe("회원가입 테스트", () => {
  beforeAll(() => {
    initModels(sequelize)
})

  test("회원등록시 암호화 테스트", () => {
    const body = {
      User: {
        id: null,
        wallet_address: "0xalskme34krm3se",
        name: "홍길동",
        email: "hong@gmail.com",
        contact: "01012340194",
        manager: 0,
      },
      Birthday: {
        id: null,
        year: 2000,
        month: 1,
        date: 20,
      },
    };

    const result = cryptoUserInfo(body);

    const expectResult = {
      hashed:
        "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
      userInstance: {
        id: "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
        wallet_address: "0xalskme34krm3se",
        name: "홍길동",
        email: "hong@gmail.com",
        contact: "01012340194",
        manager: 0,
      },
      userBirthDate: {
        id: "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
        year: 2000,
        month: 1,
        date: 20,
      },
    };

    expect(result).toEqual(expectResult);
  });

//   @TODO : Test suite failed to run 
  // describe("/register 라우터 테스트", () => {
  //   afterAll(async () => {
  //     const targeId = {
  //       where: {
  //         id: "adc8b0325c206558a8236bdbf301dc944f50b35132e41b9e623e94e638659243",
  //       },
  //     };

  //     await Join_date.destroy(targeId);
  //     await Birth_date.destroy(targeId);
  //     await User.destroy(targeId);
  //   });
  //   test("회원등록시 암호화 테스트", async () => {
  //     const body = {
  //       User: {
  //         id: null,
  //         wallet_address: "0xalskme34krm3se",
  //         name: "홍길동",
  //         email: "hong@gmail.com",
  //         contact: "01012340194",
  //         manager: 0,
  //       },
  //       Birthday: {
  //         id: null,
  //         year: 2000,
  //         month: 1,
  //         date: 20,
  //       },
  //     };

  //     const { userInstance, userBirthDate, hashed } = cryptoUserInfo(body);
  //     expect(() => CreateUser.registerUser(userInstance, userBirthDate, hashed)).not.toThrowError()  
      
  //   });
  // });
});
