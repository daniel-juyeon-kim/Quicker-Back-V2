import { NextFunction, Request, Response } from "express";
import { OrderLocationService } from "../../../service/order/location/order-location.service";
import { HttpResponse } from "../../../util/http-response";

export class OrderLocationController {
  constructor(private readonly service: OrderLocationService) {}

  getCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;

      const location = await this.service.findDepartureAndDestination(orderId);

      res.send(new HttpResponse(200, location));
    } catch (error) {
      next(error);
    }
  };
}
