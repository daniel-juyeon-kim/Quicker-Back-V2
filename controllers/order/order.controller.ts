import { NextFunction, Request, Response } from "express";

import { matchedData } from "express-validator";
import { averageInstance, orderInstance, userInstance } from "../../maria/commands";
import { currentLocationInstance } from "../../mongo/command";
import connectMongo from "../../mongo/connector";

import { parseNumericsToNumberList } from "../../core";
import { OrderService } from "../../service/order/order.service";
import { findDistanceKey } from "../../util/distance";
import { HttpErrorResponse, HttpResponse } from "../../util/http-response";
import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";
import { OrderIdParam } from "../../validator/schema/routes/params";

export class OrderController {
  private readonly service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

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

  // query : {
  //   userWalletAdress: string
  // }

  // {
  //   id: number;
  //   DETAIL: string | undefined;
  //   PAYMENT: number;
  //   Transportation : {
  //     WALKING: number;
  //     BICYCLE: number;
  //     SCOOTER: number;
  //     BIKE: number;
  //     CAR: number;
  //     TRUCK: number;
  //   },
  //   Destination: {
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Departure: {
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Product: {
  //     WIDTH: number;
  //     LENGTH: number;
  //     HEIGHT: number;
  //     WEIGHT: number;
  //   }[]
  // }
  getRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { walletAddress } = matchedData(req);

      const user = await userInstance.findId(walletAddress);

      if (!user) {
        throw new HttpErrorResponse(404, "해당 지갑주소와 일치하는 사용자가 존재하지 않습니다.");
      }

      const orders = await orderInstance.findForSearch(user.id);

      if (orders.length === 0) {
        throw new HttpErrorResponse(404, "생성된 오더가 없습니다.");
      }

      res.send(new HttpResponse(200, orders));
    } catch (error) {
      next(error);
    }
  };

  // query : {
  //   orderIds: string
  // }

  // {
  //   id: number
  //   DETAIL: string | undefined
  //   Destination: {
  //     X: number
  //     Y: number
  //     DETAIL: string
  //   }
  //   Departure: {
  //     X: number
  //     Y: number
  //     DETAIL: string
  //   }
  //   Recipient: {
  //     NAME: string
  //     PHONE: string
  //   }
  //   Sender : {
  //     NAME: string
  //     PHONE: string
  //   }
  //   Product: {
  //     WIDTH: number
  //     LENGTH: number
  //     HEIGHT: number
  //     WEIGHT: number
  //   }
  // }[]

  orderlist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderIds } = matchedData(req) as { orderIds: string };

      const parsedIds = parseNumericsToNumberList(orderIds);
      const orders = await orderInstance.findForDetail(parsedIds);

      res.send(new HttpResponse(200, orders));
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
  //   quicker: string // address
  // }

  // response {
  //   X : number,
  //   Y : number
  // }

  getLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { quicker } = matchedData(req);

      const connection = await connectMongo("realTimeLocation");
      const location = await currentLocationInstance.find(connection, quicker);

      if (!location) {
        throw new HttpErrorResponse(500);
      }

      if (!(location.X && location.Y)) {
        throw new HttpErrorResponse(404, "요청한 데이터가 존재하지 않습니다.");
      }

      res.send(location);
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
