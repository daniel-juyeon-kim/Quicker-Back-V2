import { NextFunction, Request, Response } from "express";
import { SenderReceiverService } from "../../service/order/sender-receiver/sender-receiver.service";
import { HttpResponse } from "../../util/http-response";
import { OrderSenderReceiverControllerRequestData } from "../../validator/schema/routes/chat-room/chat-room-controller-request-data";

export class OrderSenderReceiverController {
  constructor(private readonly service: SenderReceiverService) {}

  getSenderReceiverInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params as OrderSenderReceiverControllerRequestData["getSenderReceiverInfo"];

      const senderReceiverInfo = await this.service.findSenderReceiverInfo(orderId);

      res.send(new HttpResponse(200, senderReceiverInfo));
    } catch (error) {
      next(error);
    }
  };
}
