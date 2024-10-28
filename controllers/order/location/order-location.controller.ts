import { NextFunction, Request, Response } from "express";
import { OrderLocationService } from "../../../service/order/location/order-location.service";
import { HttpResponse } from "../../../util/http-response";
import { OrderControllerRequestData } from "../../../validator/schema/routes/order/order-controller-request-data";

export class OrderLocationController {
  constructor(private readonly service: OrderLocationService) {}

  getCoordinates = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.query as OrderControllerRequestData["getCoordinates"];

      const location = await this.service.findDepartureAndDestination(parseInt(orderId));

      res.send(new HttpResponse(200, location));
    } catch (error) {
      next(error);
    }
  };
}
