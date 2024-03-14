import { NextFunction, Request, Response } from "express";

import { classifyDistance, updateOrder } from "../service/order";

import config from "../config";
import { averageInstance, locationInstance, orderInstance, roomInstance, userInstance } from "../maria/commands";
import sequelizeConnector from "../maria/connector/sequelize-connector";
import { initModels } from "../maria/models/init-models";
import { currentLocationInstance, imageInstance } from "../mongo/command";
import connectMongo from "../mongo/connector";
import { cryptoInstance, nhnApi } from "../service";
import { HTTPError } from "../types/http-error";

initModels(sequelizeConnector);
export class OrderController {
  // body: {
  //   userWalletAddress: string,
  //   Order: {
  //     id: number;
  //     ID_REQ: string;
  //     ID_DVRY: string | undefined;
  //     DETAIL: string | undefined;
  //     PAYMENT: number;
  //     CHECK_RES: number;
  //     PICTURE: string | undefined;
  //   },
  //   Transportation: {
  //     ID: number;
  //     WALKING: number;
  //     BICYCLE: number;
  //     SCOOTER: number;
  //     BIKE: number;
  //     CAR: number;
  //     TRUCK: number;
  //   },
  //   Destination: {
  //     id: number;
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Departure: {
  //     ID: number;
  //     X: number;
  //     Y: number;
  //     DETAIL: string;
  //   },
  //   Product: {
  //     ID: number;
  //     WIDTH: number;
  //     LENGTH: number;
  //     HEIGHT: number;
  //     WEIGHT: number;
  //   },
  //   Sender: {
  //     ID: number;
  //     NAME: string;
  //     PHONE: string;
  //   },
  //   Recipient: {
  //     id: number;
  //     NAME: string;
  //     PHONE: string;
  //   }
  // }

  // response 200

  async request(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const walletAddress = body.userWalletAddress;
      const user = await userInstance.findId(walletAddress);

      if (!user) throw new Error("회원이 아님");
      body.Order.ID_REQ = user.id;
      await orderInstance.create(body);
      
      res.send({ msg: "done" });
    } catch (error) {
      next(error);
    }
  }

  // query : {
  //   orderIds: string
  // }

  // {
  //   id: number
  //   DETAIL: string| undefined
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
  
  async orderlist(req: Request, res: Response, next: NextFunction) {
    try {
      const orderIds = req.query.orderIds;
      const idList = JSON.parse(`[${orderIds}]`);
      const orders = await orderInstance.findForDetail(idList);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }

  // query {
  //   orderid
  // }

  // response : {
  //   id: number;
  //   Destination : {
  //     X: number;
  //     Y: number;
  //   }
  //   Departure: {
  //     X!: number;
  //     Y!: number;
  //   }  
  // }

  async order(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.query.orderid;
      if (typeof orderId === "string") {
        const location = await locationInstance.find(parseInt(orderId));
        res.send(location);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // body: {
  //   userWalletAddress : string
  //   orderId: number
  // }

  // response 200
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      //TODO: 리팩토링 보류
      await updateOrder(body, nhnApi, cryptoInstance, config.crypto.url as string);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // query {
  //   orderNum: number
  // }

  // response 200

  async getRoomInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const orderNum = query.orderNum;
      let room = null;
      if (typeof orderNum === "string") {
        room = await roomInstance.find(parseInt(orderNum));
      } else if (typeof orderNum === "number") {
        room = await roomInstance.find(orderNum);
      }
      res.send(room);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // body {
  //   X: number
  //   Y: number
  //   address: string // walletAddress
  // }

  // response 200

  async postLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const address = body.address;
      const loaction = {
        X: body.X,
        Y: body.Y,
      };
      const connection = await connectMongo("realTimeLocation");
      await currentLocationInstance.create(connection, address, loaction);
      res.send({ msg: "done" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // query {
  //   quicker: string // address
  // }

  // response {
  //   address : string,
  //   X : number,
  //   Y : number
  // }

  async getLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const address = query.quicker;
      const connection = await connectMongo("realTimeLocation");
      const location = await currentLocationInstance.find(connection, address);
      res.json(location);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  // query {
  //   orderNum: number
  // }

  // response {
  //   image: string
  // }

  async getImage(req: Request, res: Response, next: NextFunction) {
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
  }

  // body {
  //   file: string
  //   orderNum: number
  // }

  // response 200

  async postImage(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      if (!req.file) throw new Error('image file not exist')
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
  }

  // query {
  //   orderNum: number
  // }

  // response {
  //   imageBuffer: string
  //   reason: string
  // }

  async getFailImage(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const orderId = query.orderNum;
      if (typeof orderId !== "string") {
        throw new Error("TypeError : orderId be string");
      }
      const connection = await connectMongo("orderFail");
      const image = await imageInstance.findFailImage(connection, orderId);
      if (image === null || undefined) {
        res.send(null);
      } else {
        res.send({ imageBuffer: image.image, reason: image.reason });
      }
    } catch (error) {
      next(error);
    }
  }

  // body {
  //   file: string
  //   reason: string
  // }

  // response 200

  async postFailImage(req: Request, res: Response, next: NextFunction) {
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
      await imageInstance.createFailImage(
        connection,
        orderNum,
        bufferImage,
        reason,
      );
      res.send({ msg: "done" });
    } catch (error) {
      next(error);
    }
  }

  // query {
  //   distance: number
  // }

  // response {
  //   distance: number
  // }

  async getAverageCost(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const classifiedDistance = await classifyDistance(query);
      const averageCost = await averageInstance.findLastMonthCost(
        classifiedDistance,
      );
      if (averageCost !== null) {
        res.send({ distance: averageCost[classifiedDistance] });
        return;
      }
      const HTTPError : HTTPError = new Error("Internal Server Error")
      HTTPError.status = 500 
      throw HTTPError
    } catch (error) {
      next(error);
    }
  }
}