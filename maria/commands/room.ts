import { Chat_room, Departure, Destination, Order, Recipient, Sender } from "../models/init-models";

export class RoomModel {
  create(orderId: number, deliverId: string, requesterId: string) {
    return Chat_room.create({
      chat_order_id: orderId,
      request_id: requesterId,
      delivery_id: deliverId,
    });
  }
  async find(orderId: number) {
    Order.hasOne(Sender, { foreignKey: "id" });
    Order.hasOne(Recipient, { foreignKey: "id" });
    Sender.hasOne(Departure, { foreignKey: "id" });
    Recipient.hasOne(Destination, { foreignKey: "id" });
    return Order.findOne({
      attributes: ["id"],
      where: { id: orderId },
      include: [
        {
          model: Sender,
          attributes: ["PHONE"],
          include: [
            {
              model: Departure,
              attributes: ["X", "Y"],
            },
          ],
        },
        {
          model: Recipient,
          attributes: ["PHONE"],
          include: [
            {
              model: Destination,
              attributes: ["X", "Y"],
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    });
  }
}