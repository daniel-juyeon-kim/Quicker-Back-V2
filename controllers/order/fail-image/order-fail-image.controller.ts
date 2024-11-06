import { NextFunction, Request, Response } from "express";
import { OrderFailImageService } from "../../../service/order/order-fail-image/order-fail-image.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderFailImageControllerRequestData } from "../../../validator/schema/routes/order/order-fail-image-controller-request-data";
import { OrderIdParam } from "../../../validator/schema/routes/params";

export class OrderFailImageController {
  constructor(private readonly service: OrderFailImageService) {}

  getFailImage = async (req: Request<OrderIdParam>, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;

      const failImage = await this.service.findOrderFailImage(orderId);

      res.send(new HttpResponse(200, { imageBuffer: failImage.image, reason: failImage.reason }));
    } catch (error) {
      next(error);
    }
  };
  postFailImage = async (
    req: Request<never, never, OrderFailImageControllerRequestData["postOrderFailImage"]>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { orderId, reason } = req.body;
      const file = req.file as Express.Multer.File;

      await this.service.createFailImage({ orderId, reason, file });

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
}
