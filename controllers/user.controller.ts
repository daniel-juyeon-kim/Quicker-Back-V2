import { NextFunction, Request, Response } from "express";

import { keyCreator } from "../core";
import { UserService } from "../service/user/user-service";
import { HttpResponse } from "../util/http-response";
import { UserControllerRequestData } from "../validator/schema/routes/user";

export class UserController {
  constructor(private readonly service: UserService) {}

  postUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as UserControllerRequestData["postUser"];

      await this.service.postUser(body, keyCreator);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  findUserNameByWalletAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.query as UserControllerRequestData["findUserNameByWalletAddress"];

      const name = await this.service.findUserNameByWalletAddress(walletAddress);

      res.send(new HttpResponse(200, name));
    } catch (error) {
      next(error);
    }
  };
  putUserImageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress, imageId } = req.body as UserControllerRequestData["putUserImageId"];

      await this.service.putUserImageId({ walletAddress, imageId });

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
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
