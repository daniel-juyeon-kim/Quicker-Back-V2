import { NextFunction, Request, Response } from "express";
import { matchedData } from "express-validator";
import { HTTPErrorResponse, HTTPResponse } from "../service/http-response";
import { messageInstance } from "../mongo/command";
import { isAttributeNull } from "../service/checker";

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
  async getRecentMessage (req: Request, res: Response, next: NextFunction) {
    try {
      const { orderNum } = matchedData(req)
      const recentMessage = await messageInstance.findRecent(parseInt(orderNum))
      
      if (!recentMessage) {
        throw new HTTPErrorResponse(500)
      }

      if(isAttributeNull(recentMessage)) {
        throw new HTTPErrorResponse(404, "요청한 데이터가 존재하지 않습니다.");
      }
      
      res.send(new HTTPResponse(200, recentMessage));
    } catch (err) {
      next(err)
    }
  }
}