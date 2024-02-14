import { Departure, Destination, Order } from "../models/init-models";

export interface Location {
  id: number,
  Destination: { X: number, Y: number },
  Departure: { X: number, Y: number }
}

export class LocationModel {
  find(orderId: number) : Promise<Location | null> {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    return Order.findOne({
      attributes: ["id"],
      where: { id: orderId },
      include: [
        {
          model: Destination,
          attributes: { exclude: ["id", "DETAIL"] },
          required: true,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id", "DETAIL"] },
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }

  findAll(orderIds: number[]) : Promise<Location[]> {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    return Order.findAll({
      attributes: ["id"],
      where: { id: orderIds },
      include: [
        {
          model: Destination,
          attributes: { exclude: ["id", "DETAIL"] },
          required: true,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id", "DETAIL"] },
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });
  }
}