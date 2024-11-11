import { NextFunction, Request, Response } from "express";
import { DeliveryPersonService } from "../../service/order/delivery-person/delivery-person.service";
import { HttpResponse } from "../../util/http-response";
import { OrdersDeliveryPersonLocationControllerRequestData } from "../../validator/schema/routes/current-deliver-location";

export class OrderDeliveryPersonController {
  constructor(private readonly service: DeliveryPersonService) {}

  getDeliveryPersonCurrentLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;

      const location = await this.service.findCurrentLocation(orderId);

      res.send(new HttpResponse(200, location));
    } catch (error) {
      next(error);
    }
  };
  postDeliveryPersonCurrentLocation = async (
    req: Request<never, never, OrdersDeliveryPersonLocationControllerRequestData["postDeliveryPersonCurrentLocation"]>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;

      await this.service.createDeliveryPersonCurrentLocation(body);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
}
