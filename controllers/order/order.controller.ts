import { NextFunction, Request, Response } from "express";

import { matchedData } from "express-validator";
import { averageInstance, orderInstance, roomInstance, userInstance } from "../../maria/commands";
import { Order } from "../../maria/models/init-models";
import { currentLocationInstance, imageInstance } from "../../mongo/command";
import connectMongo from "../../mongo/connector";

import { parseNumericsToNumberList } from "../../core";
import { OrderService } from "../../service/order/order.service";
import { findDistanceKey } from "../../util/distance";
import { HttpErrorResponse, HttpResponse } from "../../util/http-response";
import { OrderControllerRequestData } from "../../validator/schema/routes/order/order-controller-request-data";

export class OrderController {
  private readonly service: OrderService;

  constructor(service: OrderService) {
    this.service = service;
  }

  createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as OrderControllerRequestData["createOrder"];

      await this.service.createOrder(body);

      res.send(new HttpResponse(200));
    } catch (error) {
      next(error);
    }
  };
  updateOrderDeliveryPerson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as OrderControllerRequestData["updateOrderDeliveryPerson"];

      await this.service.matchDeliveryPersonAtOrder(body);

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

  // body {
  //   file: string
  //   reason: string
  // }

  // response 200
  postFailImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const documentFile = req.file;

      if (documentFile === undefined) {
        throw new Error("File not exist");
      }

      const bufferImage = documentFile.buffer;
      const orderNum = body.orderNum;
      const reason = body.reason;
      const connection = await connectMongo("orderFail");
      await imageInstance.createFailImage(connection, orderNum, bufferImage, reason);
      res.send({ msg: "done" });
    } catch (error) {
      next(error);
    }
  };

  // query {
  //   orderNum: number
  // }

  // response {
  //   image: string
  // }

  getImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const orderId = query.orderNum;
      const connection = await connectMongo("orderComplete");

      if (typeof orderId !== "string") {
        throw new Error("TypeError : orderId be string");
      }

      const images = await imageInstance.find(connection, orderId);
      let image;
      if (images.length === 0) {
        image = null;
      } else {
        image = { imageBuffer: images[0].image };
      }
      res.send(image);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  // body {
  //   file: string
  //   orderNum: number
  // }

  // response 200

  postImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      if (!req.file) throw new Error("image file not exist");
      const documentFile = req.file;
      const orderNum = body.orderNum;
      const bufferImage = documentFile.buffer;
      const connection = await connectMongo("orderComplete");
      await imageInstance.create(connection, orderNum, bufferImage);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
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

  // query {
  //   orderNum: number
  // }

  // response 200

  getRoomInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderNum } = matchedData(req);
      const room = (await roomInstance.find(parseInt(orderNum))) as Order;
      res.send(new HttpResponse(200, room));
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
