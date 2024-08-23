import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";

import { messageInstance } from "../mongo/command";
import { isAttributeNull } from "../service/checker";
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
      const recentMessage = await messageInstance.findRecent(parseInt(orderNum));

      if (!recentMessage) {
        throw new HttpErrorResponse(500);
      }

      if (isAttributeNull(recentMessage)) {
        throw new HttpErrorResponse(404, "요청한 데이터가 존재하지 않습니다.");
      }

      res.send(new HttpResponse(200, recentMessage));
    } catch (err) {
      next(err);
    }
  }
}
