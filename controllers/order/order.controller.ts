import { NextFunction, Request, Response } from "express";

import { OrderService } from "../../service/order/order.service";
import { HttpResponse } from "../../util/http-response";
import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";
import { OrderIdsParam } from "../../validator/schema/routes/orders/detail";
import { WalletAddressQuery } from "../../validator/schema/routes/query";

export class OrderController {
  private readonly service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  getMatchableOrdersByWalletAddress = async (
    req: Request<never, never, never, WalletAddressQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { walletAddress } = req.query;

      const orders = await this.service.findAllMatchableOrder(walletAddress);

      res.send(new HttpResponse(200, orders));
    } catch (error) {
      next(error);
    }
  };
  createOrder = async (
    req: Request<never, never, OrderControllerRequestData["createOrder"]>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const body = req.body;

      await this.service.createOrder(body);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  getOrdersDetail = async (req: Request<OrderIdsParam>, res: Response, next: NextFunction) => {
    try {
      const { orderIds } = req.params;

      const details = await this.service.findAllOrderDetail(orderIds);

      res.send(new HttpResponse(200, details));
    } catch (error) {
      next(error);
    }
  };
  getLatestAverageCost = async (
    req: Request<never, never, never, { distance: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { distance } = req.query;

      const averageCost = await this.service.findLatestOrderAverageCost(distance);

      res.send(new HttpResponse(200, averageCost));
    } catch (error) {
      next(error);
    }
  };
}
