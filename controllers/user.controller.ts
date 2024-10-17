import { NextFunction, Request, Response } from "express";

import { keyCreator } from "../core";
import { UserService } from "../service/user/user-service";
import { HttpResponse } from "../util/http-response";
import { UserControllerRequestData } from "../validator/schema/routes/user";

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

  registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as UserControllerRequestData["registerUser"];

      await this.service.registerUser(body, keyCreator);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };

  // query : {
  //   walletAddress : string
  // }

  // {
  //   name : string
  // }

  findUserNameByWalletAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.query as UserControllerRequestData["findUserNameByWalletAddress"];

      const name = await this.service.findUserNameByWalletAddress(walletAddress);

      res.send(new HttpResponse(200, name));
    } catch (error) {
      next(error);
    }
  };

  // body : {
  //   walletAddress: string,
  //   imageId: string
  // }

  // response 200

  putUserImageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress, imageId } = req.body as UserControllerRequestData["putUserImageId"];

      await this.service.putUserImageId({ walletAddress, imageId });

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };

  // query: {
  //   walletAddress: string
  // }

  // Image : {
  //   imageId: string
  // }

  getUserImageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.query as UserControllerRequestData["getUserImageId"];

      const imageId = await this.service.getUserImageId(walletAddress);

      res.send(new HttpResponse(200, imageId));
    } catch (error) {
      next(error);
    }
  };
}
