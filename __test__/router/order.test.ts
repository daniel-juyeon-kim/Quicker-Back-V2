import mongoose from "mongoose";
import CreateOrder from "../../Maria/Commands/CreateOrder";
import DeleteOrder from "../../Maria/Commands/DeleteOrder";
import { initModels } from "../../Maria/Models/init-models";
import { findImageByOrderId, saveImageToBufferString } from "../../Mongo/Command/Image";
import {
  createOrder,
  findDestinationAndDepartureByOrderId,
} from "../../service/Order";
import { sequelize } from "../connectors/sequelizeConnector";
import { ImageFile } from "../../Mongo/Schemas/ImageFile";
import { Binary } from "mongodb";

describe("/order", () => {
  beforeAll(() => {
    initModels(sequelize);
  });

  describe("/ (GET) 라우터 테스트", () => {
    describe("출발지와 도착지의 주소 좌표를 데이터베이스에서 가지고 오는 서비스", () => {
      test("존재하는 오더 넘버 입력", async () => {
        const expectResult = {
          id: 2,
          Destination: { X: 127.049593854342, Y: 37.5712239267109 },
          Departure: { X: 127.116522400337, Y: 37.5377319989174, id: 2 },
        };

        const query = { orderid: "2" };
        const instance = await findDestinationAndDepartureByOrderId(query);
        expect(instance).toStrictEqual(expectResult);
      });

      test("존재하지 않는 오더 넘버 입력", async () => {
        const query = { orderid: "0" };
        const instance = await findDestinationAndDepartureByOrderId(query);
        expect(instance).toBe(null);
      });
    });
  });

  describe("/ (POST) 라우터 테스트", () => {
    describe("오더 정보를 받아 데이터베이스에 저장하는 서비스", () => {
      afterAll(async () => {
        await DeleteOrder.deleteOrder(10);
      });
      test("존재하는 오더 넘버 입력", async () => {
        const body = {
          Order: {
            id: 10,
            ID_REQ:
              "51b7a95b2410d2e4aa19fcde2dee14fed86586c38240caac268ab5f5cfb8c145",
            ID_DVRY: "",
            DETAIL: "물품 세부사항",
            PAYMENT: 0,
            CHECK_RES: 0,
            PICTURE: "",
          },
          Transportation: {
            ID: 10,
            WALKING: true,
            BICYCLE: false,
            SCOOTER: false,
            BIKE: false,
            CAR: false,
            TRUCK: false,
          },
          Destination: {
            id: 10,
            X: 127.023150432187,
            Y: 37.5182112402056,
            DETAIL: "세부주소1",
          },
          Departure: {
            ID: 10,
            X: 126.493995014515,
            Y: 37.7446207414936,
            DETAIL: "세부주소2",
          },
          Product: { ID: 10, WIDTH: 3, LENGTH: 3, HEIGHT: 3, WEIGHT: 15 },
          Sender: { ID: 10, NAME: "홍길동", PHONE: "01012345678" },
          Recipient: { id: 10, NAME: "김길동", PHONE: "01009876543" },
        };
        expect(async () => {
          await CreateOrder.Order(body);
        }).not.toThrowError();
      });
    });
  });

  describe("/image/complete ",  () => { 
    
    describe("(POST) 라우터 테스트", () => {
      const bufferImage = "lekfjlksejfl";
      const connection = mongoose.createConnection("mongodb://127.0.0.1:27017",{ dbName: "orderComplete" });
      const orderNumber = "11111";
      test("이미지를 데이터베이스에 저장하는 서비스", async () => {
        expect(async () => await saveImageToBufferString(connection, orderNumber, bufferImage)).not.toThrowError();
      });
      afterAll(async () => {
        await connection.db.dropCollection("11111");
      });
    });
   
    describe("(GET) 라우터 테스트", () => {
      const bufferImage = "lekfjlksejfl";
      const connection = mongoose.createConnection("mongodb://127.0.0.1:27017",{ dbName: "orderComplete" });
      const orderNumber = "11112";
      test("이미지를 데이터베이스에 저장하는 서비스", async() => {
        const result = await findImageByOrderId(connection, orderNumber)
        expect(result[0].image?.toString('utf-8')).toEqual(bufferImage)
      });
    });
    
    
  });
});
