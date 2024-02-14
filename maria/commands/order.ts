import { Op } from "sequelize";
import { CacheMatchedOrder, Chat_room, Departure, Destination, Order, Product, Recipient, Sender, Transportation } from "../models/init-models";

export class OrderModel {
  create(order: any) {
    Order.create(order.Order);
    Transportation.create(order.Transportation);
    Destination.create(order.Destination);
    Departure.create(order.Departure);
    Product.create(order.Product);
    Sender.create(order.Sender);
    Recipient.create(order.Recipient);
  }

  findForSearch(userId: string) {
    Order.hasOne(Transportation, { foreignKey: "id" });
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Product, { foreignKey: "id" });
    return Order.findAll({
      attributes: ["id", "PAYMENT", "DETAIL"],
      where: {
        [Op.and]: [
          {
            ID_REQ: {
              [Op.ne]: userId,
            },
          },
          {
            ID_DVRY: {
              [Op.eq]: "",
            },
          },
        ],
      },
      include: [
        {
          model: Transportation,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
        {
          model: Destination,
          attributes: { exclude: ["id"] },
          required: true,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id"] },
          required: true,
        },
        {
          model: Product,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
      ],
      raw: true,
      nest: true,
    });
  }

  findForDetail(orderIds: number[]) {
    Order.hasOne(Destination, { foreignKey: "id" });
    Order.hasOne(Departure, { foreignKey: "id" });
    Order.hasOne(Recipient, { foreignKey: "id" });
    Order.hasOne(Sender, { foreignKey: "id" });
    Order.hasOne(Product, { foreignKey: "id" });
    return Order.findAll({
      where: { id: orderIds },
      attributes: ["id", "DETAIL"],
      include: [
        {
          model: Destination,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
        {
          model: Departure,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
        {
          model: Recipient,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
        {
          model: Sender,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
        {
          model: Product,
          attributes: { exclude: ["ID", "id"] },
          required: false,
        },
      ],
      raw: true,
      nest: true,
    });
  }

  findRequesterId(orderId: number) {
    return Order.findOne({
      attributes: ["id", "ID_REQ", "ID_DVRY"],
      where: { id: orderId },
    });
  }

  findReceiverPhoneNumber(orderId: number) {
    return Recipient.findOne({
      attributes: ["id", "PHONE"],
      where: { id: orderId },
    });
  }

  async update(userId: string, orderId: number) {
    return Order.update(
      { ID_DVRY: userId },
      {
        where: {
          id: orderId,
        },
      },
    );
  }

  async delete(OrderId: number) {
    await CacheMatchedOrder.destroy({ where: { id: OrderId } });
    await Chat_room.destroy({ where: { chat_order_id: OrderId } });
    await Transportation.destroy({ where: { ID: OrderId } });
    await Sender.destroy({ where: { ID: OrderId } });
    await Recipient.destroy({ where: { id: OrderId } });
    await Destination.destroy({ where: { id: OrderId } });
    await Departure.destroy({ where: { ID: OrderId } });
    await Product.destroy({ where: { ID: OrderId } });
    await Order.destroy({ where: { id: OrderId } });
  }
}