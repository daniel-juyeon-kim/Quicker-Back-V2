import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import { keyCreator } from "../core";
import { UserService } from "../service/user/user-service";
import { HttpResponse } from "../util/http-response";
import { UserControllerRequestData as RequestData } from "../validator/schema/routes/user";

export class UserController {
  constructor(private readonly service: UserService) {}

  // body {
  //   User: {
  //     wallet_address: string,
  //     name: string,
  //     email: string,
  //     contact: string
  //   },
  //   Birthday: {
  //     year: number,
  //     month: number,
  //     date: number
  //   }
  // }

  // response : 200

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = matchedData<RequestData["registerUser"]>(req);

      await this.service.registerUser(body, keyCreator);

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
      const { walletAddress } = matchedData<RequestData["findUserNameByWalletAddress"]>(req);

      const name = await this.service.findUserNameByWalletAddress(walletAddress);

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
      const { walletAddress, imageId } = matchedData<RequestData["putUserImageId"]>(req);

      await this.service.putUserImageId({ walletAddress, imageId });

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
      const { walletAddress } = matchedData<RequestData["getUserImageId"]>(req);

      const imageId = await this.service.getUserImageId(walletAddress);

      res.send(new HttpResponse(200, imageId));
    } catch (error) {
      next(error);
    }
  }
}
