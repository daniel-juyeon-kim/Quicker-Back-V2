import { NextFunction, Request, Response } from "express";
import { DeliveryPersonService } from "../../service/order/delivery-person/delivery-person.service";
import { HttpResponse } from "../../util/http-response";

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
}
