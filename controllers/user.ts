import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import { config } from "../config";
import { userInstance } from "../maria/commands";
import sequelizeConnector from "../maria/connector/sequelize-connector";
import { initModels } from "../maria/models/init-models";
import { keyCreator } from "../service";
import { HttpErrorResponse, HttpResponse } from "../util/http-response";

initModels(sequelizeConnector);

export class UserController {
  // body {
  //   User: {
  //     contact: string
  //   }
  //   Birthday: string
  // }

  // User {
  //   wallet_address: string;
  //   name: string;
  //   email: string;
  //   contact: string;
  // }

  // Birthday {
  //   id!: string;
  //   year!: number;
  //   month!: number;
  //   date!: number;
  // }

  // id: string;
  // timeStamp: number;

  // response : {200}
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { User, Birthday } = matchedData(req);

      const userPk = keyCreator.createDbUserPk(User.contact, config.cryptoKey as string);

      User.id = userPk;
      Birthday.id = userPk;

      await userInstance.register(User, Birthday, userPk);

      res.send(new HttpResponse(200));
    } catch (error) {
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
      const { walletAddress } = matchedData(req);

      const name = await userInstance.findName(walletAddress);

      if (!name) {
        throw new HttpErrorResponse(500, "사용자가 존재하지 않습니다.");
      }

      res.send(new HttpResponse(200, name));
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
      const { walletAddress, imageId } = matchedData(req);

      const user = await userInstance.findId(walletAddress);

      if (!user) {
        throw new HttpErrorResponse(500, "사용자가 존재하지 않습니다.");
      }

      await userInstance.updateImageId(user.id, imageId);

      res.send(new HttpResponse(200));
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
      const { walletAddress } = matchedData(req);

      const user = await userInstance.findId(walletAddress);

      if (!user) {
        return next(new HttpErrorResponse(500, "사용자가 존재하지 않습니다."));
      }

      const imageId = await userInstance.findImageId(user.id);

      if (!imageId) {
        throw new Error("사용자의 이미지 정보가 존재하지 않습니다.");
      }

      res.send(new HttpResponse(200, imageId));
    } catch (error) {
      next(error);
    }
  }
}
