import { NextFunction, Request, Response } from "express";

import { keyCreator } from "../core";
import { UserService } from "../service/user/user.service";
import { HttpResponse } from "../util/http-response";
import { UserControllerRequestData } from "../validator/schema/routes/user/user-controller-request-data";

export class UserController {
  constructor(private readonly service: UserService) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as UserControllerRequestData["createUser"];

      await this.service.createUser(body, keyCreator);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  getUserName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.query as UserControllerRequestData["getUserName"];

      const name = await this.service.findUserNameByWalletAddress(walletAddress);

      res.send(new HttpResponse(200, name));
    } catch (error) {
      next(error);
    }
  };
  updateUserImageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress, imageId } = req.body as UserControllerRequestData["updateUserImageId"];

      await this.service.updateUserImageId({ walletAddress, imageId });

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  getUserImageId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = req.query as UserControllerRequestData["getUserImageId"];

      const imageId = await this.service.findUserImageId(walletAddress);

      res.send(new HttpResponse(200, imageId));
    } catch (error) {
      next(error);
    }
  };
}
