import { NextFunction, Request, Response } from "express";
import { DeliveryPersonService } from "../../service/order/delivery-person/delivery-person.service";
import { HttpResponse } from "../../util/http-response";
import { OrderDeliveryPersonControllerRequestData } from "../../validator/schema/routes/order/order-delivery-person-controller-request-data";
import { OrderIdParam } from "../../validator/schema/routes/params";

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
    req: Request<never, never, OrderDeliveryPersonControllerRequestData["postDeliveryPersonCurrentLocation"]>,
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
  updateOrderDeliveryPerson = async (
    req: Request<OrderIdParam, never, OrderDeliveryPersonControllerRequestData["updateOrderDeliveryPerson"]>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { orderId } = req.params;
      const { walletAddress } = req.body;

      await this.service.matchDeliveryPersonAtOrder({ walletAddress, orderId });

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
}
