import { NextFunction, Request, Response } from "express";
import { OrderCompleteImageService } from "../../service/order/order-complete-image/order-complete-image.service";
import { HttpResponse } from "../../util/http-response";
import { OrderCompleteImageControllerRequestData } from "../../validator/schema/routes/order/image/complete";

export class OrderCompleteImageController {
  constructor(private readonly service: OrderCompleteImageService) {}

  getCompleteImageBuffer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.query as OrderCompleteImageControllerRequestData["getCompleteImage"];

      const buffer = await this.service.findCompleteImageBuffer(orderId);

      res.send(new HttpResponse(200, buffer));
    } catch (error) {
      next(error);
    }
  };
}
