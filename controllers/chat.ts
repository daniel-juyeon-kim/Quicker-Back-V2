import { NextFunction, Request, Response } from "express";
import { messageInstance } from "../mongo/command";
import { HTTPError } from "../types/http-error";

export class ChatController {
  async getRecentMessage (req: Request, res: Response, next: NextFunction) {
    try {
      if (typeof req.query.orderNum !== "string") {
        const HTTPError : HTTPError = new Error("Bad Request")
        HTTPError.status = 400
        throw HTTPError
      }
      const orderId = parseInt(req.query.orderNum);
      if (typeof orderId !== "number") throw new Error ("orderId not exist")
      const recentMessage = await messageInstance.findRecent(orderId)
      res.send(recentMessage);
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}