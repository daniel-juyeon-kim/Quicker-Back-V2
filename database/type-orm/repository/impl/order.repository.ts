import { DataSource, In, IsNull, Not } from "typeorm";
import { BasicDeparture, Departure } from "../../entity/departure.entity";
import { BasicDestination, Destination } from "../../entity/destination.entity";
import { BasicOrder, Order } from "../../entity/order.entity";
import { BasicProduct, Product } from "../../entity/product.entity";
import { BasicRecipient } from "../../entity/recipient.entity";
import { BasicSender } from "../../entity/sender.entity";
import { BasicTransportation, Transportation } from "../../entity/transportation.entity";
import { User } from "../../entity/user.entity";
import { AbstractRepository } from "../abstract-repository";

export class OrderRepository extends AbstractRepository<Order> {
  constructor(dataSource: DataSource) {
    super(dataSource, Order);
  }

  async create({
    order,
    recipient,
    destination,
    sender,
    departure,
    product,
    transportation,
  }: {
    order: BasicOrder;
    recipient: BasicRecipient;
    destination: BasicDestination;
    sender: BasicSender;
    departure: BasicDeparture;
    product: BasicProduct;
    transportation: BasicTransportation;
  }) {
    await this.repository.manager.transaction(async (dataSource) => {
      const orderInstance = dataSource.create(Order, order);

      await dataSource.save(Order, orderInstance);

      await dataSource.save(Product, {
        id: orderInstance.id,
        ...product,
        order: orderInstance,
      });

      await dataSource.save(Transportation, {
        id: orderInstance.id,
        ...transportation,
        order: orderInstance,
      });

      await dataSource.save(Destination, {
        id: orderInstance.id,
        ...destination,
        order: orderInstance,
        recipient: {
          id: orderInstance.id,
          ...recipient,
        },
      });

      await dataSource.save(Departure, {
        id: orderInstance.id,
        ...departure,
        order: orderInstance,
        sender: {
          id: orderInstance.id,
          ...sender,
        },
      });
    });
  }

  async findRequesterIdByOrderId(orderId: number) {
    const requester = await this.repository.findOne({
      relations: {
        requester: true,
        deliver: true,
      },
      where: { id: orderId },
      select: {
        id: true,
        requester: { id: true },
        deliver: { id: true },
      },
    });

    this.validateNull(requester);

    return requester;
  }

  async findMatchableOrderByDeliverId(deliverId: string) {
    const data = await this.repository.findOne({
      relations: {
        product: true,
        transportation: true,
        destination: true,
        departure: true,
      },
      where: {
        requester: { id: Not(deliverId) },
        deliver: { id: IsNull() },
      },
      select: {
        id: true,
        detail: true,
        product: {
          width: true,
          length: true,
          height: true,
          weight: true,
        },
        transportation: {
          walking: true,
          bicycle: true,
          scooter: true,
          bike: true,
          car: true,
          truck: true,
        },
        destination: {
          x: true,
          y: true,
          detail: true,
        },
        departure: {
          x: true,
          y: true,
          detail: true,
        },
      },
    });

    this.validateNull(data);

    return data;
  }

  async findCreatedOrDeliveredOrderDetailByOrderId(orderIds: number[]) {
    const order = await this.repository.find({
      relations: {
        product: true,
        departure: {
          sender: true,
        },
        destination: {
          recipient: true,
        },
      },
      where: { id: In(orderIds) },
      select: {
        id: true,
        detail: true,
        product: {
          width: true,
          length: true,
          height: true,
          weight: true,
        },
        departure: {
          x: true,
          y: true,
          detail: true,
          sender: {
            name: true,
            phone: true,
          },
        },
        destination: {
          x: true,
          y: true,
          detail: true,
          recipient: {
            name: true,
            phone: true,
          },
        },
      },
    });

    this.validateNull(order);

    return order;
  }

  async updateDeliver(deliverId: string, orderId: number) {
    const deliver = await this.repository.manager.findOne(User, { where: { id: deliverId } });

    this.validateNull(deliver);

    return this.repository.update({ id: orderId }, { deliver });
  }

  async delete(orderId: number) {
    await this.repository.delete(orderId);
  }
}
