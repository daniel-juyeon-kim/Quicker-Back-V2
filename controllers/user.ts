import { NextFunction, Request, Response } from "express";
import config from "../config";
import { orderInstance, userInstance } from "../maria/commands";
import sequelizeConnector from "../maria/connector/sequelize-connector";
import { initModels } from "../maria/models/init-models";
import { cryptoInstance } from "../service";
import { matchedData } from "express-validator";
import { HTTPErrorResponse, HTTPResponse } from "../service/http-response";

require("dotenv").config();
initModels(sequelizeConnector);

export class UserController {
  // NOTE : 이름 변경 필

  // query : {
  //   userWalletAdress: string
  // }
  
  // {
  //   id: number;
  //   DETAIL: string | undefined;
  //   PAYMENT: number;
  //   Transportation : {
  //     WALKING: number;
  //     BICYCLE: number;
  //     SCOOTER: number;
  //     BIKE: number;
  //     CAR: number;
  //     TRUCK: number;
  //   },
  //   Destination: {
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Departure: {
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Product: {
  //     WIDTH: number;
  //     LENGTH: number;
  //     HEIGHT: number;
  //     WEIGHT: number;
  //   }[]
  // }
  async getRequests(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const walletAddress = query.userWalletAdress;
      if (typeof walletAddress !== "string") {
        throw new Error("TypeError : walletAddress be string");
      }

      const userId = await userInstance.findId(walletAddress);
      if (userId === null) {
        throw new Error("Not exist name");
      }
      const orders = await orderInstance.findForSearch(userId.id);
      res.send(orders);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // body {
  //   User: {
  //     contact: string
  //   }
  //   Birthday: string
  // }

  // response : {200}
   
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { user, userBirthDate, hashed } = cryptoInstance.encryptForUserInfo(body, config.crypto.key as string);
      await userInstance.register(user, userBirthDate, hashed);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // query : {
  //   walletAddress : string
  // }

  // {
  //   name : string
  // }

  async findUserNameByWalletAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const { walletAddress } = matchedData(req)
      const name = await userInstance.findName(walletAddress);
      
      if (!name) {
        throw new HTTPErrorResponse(500, "사용자가 존재하지 않습니다.")
      }
      
      res.send(new HTTPResponse(200, name));
    } catch (error) {
      next(error);
    }
  }

  // body : {
  //   walletAddress: string,
  //   imageId: string
  // }

  // response 200

  async putUserImageId(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { walletAddress, imageId } = body;
      const user = await userInstance.findId(walletAddress);
      if (user !== null) {
        // TODO: 반환 데이터 참고할 때 이거 참조하자
        console.log(user.id, imageId);
        await userInstance.updateImageId(user.id, imageId);
        res.send({ message: "done" });
      } else {
        throw new Error("Can not find user id");
      }
    } catch (error) {
      next(error);
    }
  }

  // query: {
  //   walletAddress: string
  // }

  // Image : {
  //   imageId: string
  // }
  
  async getUserImageId(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const walletAddress = query.walletAddress;
      if (typeof walletAddress !== "string") {
        throw new Error("TypeError : walletAddress be string");
      }
      const user = await userInstance.findId(walletAddress);
      if (user === null) {
        throw new Error("userid not exist");
      }
      const imageId = await userInstance.findImageId(user.id);
      console.log(imageId);
      res.send(imageId);
    } catch (error) {
      next(error);
    }
  }
}
