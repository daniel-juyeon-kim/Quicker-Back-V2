import { Request, Response } from "express";
import { orderInstance } from "../maria/commands";
export class AdminController {
  async deleteAssociateOrder (req: Request, res: Response) {
    try {
      let deleteTargetId = parseInt(req.body.id);
      orderInstance.delete(deleteTargetId);
      res.redirect("/");
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  async deleteAssociateOrders (req: Request, res: Response) {
    try {
      let startNumber = parseInt(req.body.startNumber);
      let endNumber = parseInt(req.body.endNumber);
      console.log(startNumber, endNumber)
      let index = startNumber;
      for (index; index <= endNumber; index++) {
        orderInstance.delete(index)
      }
      res.redirect("/");
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }
};