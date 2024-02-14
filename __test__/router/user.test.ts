import { sequelize } from "../connectors/sequelizeConnector";
import config from "../../config";
import { Sequelize } from "sequelize";
import { initModels } from "../../Maria/Models/init-models";

describe("/user", () => {
  beforeAll(() => {
    initModels(sequelize)
})
  

  describe("/name 라우터", () => {
    describe("지갑주소를 이용하여 사용자의 이름을 가지고 오는 서비스", () => {
      test("존재하는 지갑 주소", async () => {
        const query = { walletAddress: config.test.USER_WALLET };
        const user = await findUserNameByWalletAddress(query);
        expect(user?.name).toBe("김퀵커");
      });

      test("존재하지 않는 지갑 주소", async () => {
        const query = { walletAddress: "아무개" };
        const user = await findUserNameByWalletAddress(query);
        expect(user).toBe(null);
      });
    });
  });
});
