import { sequelize } from "../connectors/sequelizeConnector";
import { initModels } from "../../Maria/Models/init-models";
import { findRoomInfoByOrderNumber } from "../../../room";
import { findRecentMessageByOrderNumber } from "../../Mongo/Command/FindMessages";
import { mongoConnection } from "../connectors/mongoConnector";

describe("/room", () => {
  describe("/ 라우터 테스트", () => {
    beforeAll(() => {
      initModels(sequelize)
  })
    describe("방에대한 정보를 오더 넘버를 이용하여 조회하는 서비스", () => {
      test("존재하는 오더 넘버 입력", async () => {
        const expectResult = {
          id: 2,
          Sender: {
            PHONE: "01030199090",
            Departure: { ID: 2, X: 127.116522400337, Y: 37.5377319989174 },
          },
          Recipient: {
            PHONE: "01039090909",
            Destination: { id: 2, X: 127.049593854342, Y: 37.5712239267109 },
          },
        };
        const query = { orderNum: 2 };
        const roomInfo = await findRoomInfoByOrderNumber(query);
        expect(roomInfo).toStrictEqual(expectResult);
      });
  
      test("존재하지 않는 오더 넘버 입력", async () => {
        const query = { orderNum: 0 };
        const roomInfo = await findRoomInfoByOrderNumber(query);
        expect(roomInfo).toBe(null);
      });
    });
  });
  
  describe("/message 라우터 테스트", () => {
    
    afterAll(() => {
      mongoConnection.destroy()
    });
  
    describe("최근 메세지 정보를 데이터베이스에서 가지고 오는 서비스", () => {
      //TODO: 값은 맞는데 테스트에서 다르다고 나온다.
      test("존재하는 오더 넘버 입력", async () => {
        const orderNumber = 2
        const expectResult = { id: '0xccff867e55e1faeaba5f7e8bbec56fbf1ea51ec7', message: '테스트' }
        
        const instance = await findRecentMessageByOrderNumber(mongoConnection, orderNumber);
        expect(JSON.stringify(instance)).toEqual(JSON.stringify(expectResult))
      });
    
      test("존재하지 않는 오더 넘버 입력", async () => {
        const orderNumber = 0
        const instance = await findRecentMessageByOrderNumber(mongoConnection, orderNumber);
        expect(instance).toBe(null);
      });
    });
  })
})

