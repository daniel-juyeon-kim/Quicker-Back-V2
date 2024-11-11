import { NextFunction, Request, Response } from "express";

import { matchedData } from "express-validator";
import { averageInstance } from "../../maria/commands";
import { currentLocationInstance } from "../../mongo/command";
import connectMongo from "../../mongo/connector";

import { OrderService } from "../../service/order/order.service";
import { findDistanceKey } from "../../util/distance";
import { HttpErrorResponse, HttpResponse } from "../../util/http-response";
import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";
import { OrderIdsParam } from "../../validator/schema/routes/orders/detail";
import { OrderIdParam } from "../../validator/schema/routes/params";
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
  updateOrderDeliveryPerson = async (
    req: Request<OrderIdParam, never, OrderControllerRequestData["updateOrderDeliveryPerson"]>,
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
  getOrdersDetail = async (req: Request<OrderIdsParam>, res: Response, next: NextFunction) => {
    try {
      const { orderIds } = req.params;

      const details = await this.service.findAllOrderDetail(orderIds);

      res.send(new HttpResponse(200, details));
    } catch (error) {
      next(error);
    }
  };

  // body {
  //   X: number
  //   Y: number
  //   address: string // walletAddress
  // }

  // response 200

  postLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address, ...location } = matchedData(req);

      const connection = await connectMongo("realTimeLocation");
      await currentLocationInstance.create(connection, address, location);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  // query {
  //   distance: number
  // }

  // response {
  //   distance: number
  // }

  getAverageCost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { distance } = matchedData(req);

      const unit = findDistanceKey(parseInt(distance));
      const averageCost = await averageInstance.findLastMonthCost(unit);

      if (!averageCost) {
        throw new HttpErrorResponse(500);
      }

      if (!averageCost[unit]) {
        throw new HttpErrorResponse(404, "요청한 데이터가 존재하지 않습니다.");
      }

      res.send(new HttpResponse(200, { distance: averageCost[unit] }));
    } catch (error) {
      next(error);
    }
  };
}
