import { NextFunction, Request, Response } from "express";

import { ChatService } from "../service/chat/chat.service";
import { HttpResponse } from "../util/http-response";
import { ChatControllerRequestData } from "../validator/schema/routes/chat/chat-controller-request-data";

export class ChatController {
  constructor(private readonly service: ChatService) {}

  async getRecentMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.params as ChatControllerRequestData["getRecentMessage"];

      const message = await this.service.findRecentMessage(roomId);

      res.send(new HttpResponse(200, message));
    } catch (err) {
      next(err);
    }
  }
}
