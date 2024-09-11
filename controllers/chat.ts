import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import { messageInstance } from "../mongo/command";
import { hasAttributeNull } from "../service/checker";
import { isNull } from "../util";
import { HttpErrorResponse, HttpResponse } from "../util/http-response";

export class ChatController {
  // query: {
  //   orderNum: string
  // }

  // {
  //   roomName: string,
  //   id: string,
  //   message: string,
  //   date : { type: Date, default: Date.now }
  // }
  async getRecentMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderNum } = matchedData(req);
      const message = await messageInstance.findRecent(parseInt(orderNum));

      if (isNull(message)) {
        throw new HttpErrorResponse(500);
      }

      if (hasAttributeNull(message)) {
        throw new HttpErrorResponse(404);
      }

      res.send(new HttpResponse(200, message));
    } catch (err) {
      next(err);
    }
  }
}
