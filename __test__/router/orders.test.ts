import { sequelize } from "../connectors/sequelizeConnector";
import { initModels } from "../../Maria/Models/init-models";
import config from "../../config";


describe("/orders", () => {
  beforeAll(() => {
    initModels(sequelize)
})
  describe("/ 라우터 테스트", () => {
    describe("의뢰수락이 가능한 의뢰목록을 조회하는 서비스", () => {
      test("사용자로 등록된 배송원 지갑주소 입력", async () => {
        const expectResult = [
          {
            id: 8,
            PAYMENT: 0,
            DETAIL: "물품 세부사항",
            Transportation: {
              WALKING: 0,
              BICYCLE: 0,
              SCOOTER: 0,
              BIKE: 1,
              CAR: 0,
              TRUCK: 0,
            },
            Destination: {
              X: 126.495300994615,
              Y: 37.7426236869778,
              DETAIL: "2동 202호",
            },
            Departure: {
              X: 126.673599070054,
              Y: 37.5142297784135,
              DETAIL: "1동 101호",
            },
            Product: { WIDTH: 10, LENGTH: 10, HEIGHT: 10, WEIGHT: 10 },
          },
        ];
        const result = await findOrdersByWalletAddress({
          userWalletAdress: config.test.USER_WALLET,
        });
        expect(result).toEqual(expectResult);
      });

      test("사용자로 등록되어 있지 않은 지갑주소 입력", () => {
        expect(async () => {await findOrdersByWalletAddress({userWalletAdress: "0x23uo2ouhfn2jbifaluw"}) }).rejects.toThrow()
      });

      test("해당 의뢰의 의뢰인 지갑주소 입력", async () => {
        const result = await findOrdersByWalletAddress({userWalletAdress: config.test.REQUESTER_WALLET})
        expect(result).toEqual([])
      });
    });
  });

  describe("/ 라우터 테스트", () => {
    test("해당 의뢰의 의뢰인 지갑주소 입력", async () => {
      const expectResult = [
        {
          "id": 1,
          "DETAIL": "테스트1746",
          "Destination": {
            "X": 127.080709221712,
            "Y": 37.5812423891842,
            "DETAIL": "ㄴㅇㄹㅁ"
          },
          "Departure": {
            "X": 127.024607040739,
            "Y": 37.4692668906442,
            "DETAIL": "ㄴㅇㄴㅇㄹㅁ"
          },
          "Recipient": { "NAME": "하하하", "PHONE": "01030902020" },
          "Sender": { "NAME": "가가가", "PHONE": "01020900310" },
          "Product": { "WIDTH": 9, "LENGTH": 9, "HEIGHT": 9, "WEIGHT": 15 }
        },
        {
          "id": 2,
          "DETAIL": "테스트1406",
          "Destination": {
            "X": 127.049593854342,
            "Y": 37.5712239267109,
            "DETAIL": "ㄴㅇㄹ"
          },
          "Departure": {
            "X": 127.116522400337,
            "Y": 37.5377319989174,
            "DETAIL": "ㅁㄴㅇㄹ"
          },
          "Recipient": { "NAME": "사사사", "PHONE": "01039090909" },
          "Sender": { "NAME": "바바바", "PHONE": "01030199090" },
          "Product": { "WIDTH": 9, "LENGTH": 9, "HEIGHT": 9, "WEIGHT": 20 }
        },
        {
          "id": 3,
          "DETAIL": "1",
          "Destination": {
            "X": 127.023150432187,
            "Y": 37.5182112402056,
            "DETAIL": "1"
          },
          "Departure": {
            "X": 126.493995014515,
            "Y": 37.7446207414936,
            "DETAIL": "1"
          },
          "Recipient": { "NAME": "1", "PHONE": "111" },
          "Sender": { "NAME": "1", "PHONE": "111" },
          "Product": { "WIDTH": 1, "LENGTH": 1, "HEIGHT": 1, "WEIGHT": 10 }
        }
      ]
      
      const result = await findUserOrdersDetail({orderIds : '1,2,3'})
      expect(result).toEqual(expectResult)
    });
  })
});
