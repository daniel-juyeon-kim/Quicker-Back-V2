import { Op } from "sequelize";
import { CacheMatchedOrder } from "../models/init-models";

export class CacheOrderModel {
  async create(orderId: number) {
    return CacheMatchedOrder.create({
      id: orderId,
      date: new Date().toISOString(),
    });
  }
  
  findAllId(startDate : Date, endDate : Date) {
    return CacheMatchedOrder.findAll({
      attributes: ["id"],
      where: { 
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        }
      },
      raw: true,
      nest: true,
    });
  }
}