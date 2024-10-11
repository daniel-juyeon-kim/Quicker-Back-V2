import { In, IsNull, Not, Repository } from "typeorm";

import {
  BasicDeparture,
  BasicDestination,
  BasicOrder,
  BasicProduct,
  BasicRecipient,
  BasicSender,
  BasicTransportation,
  Departure,
  Destination,
  Order,
  Product,
  Transportation,
  User,
} from "../../entity";
import { AbstractRepository } from "../abstract-repository";

export class OrderRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
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

      const id = orderInstance.id;

      await dataSource.save(Product, {
        id,
        ...product,
        order: orderInstance,
      });
      await dataSource.save(Transportation, {
        id,
        ...transportation,
        order: orderInstance,
      });
      await dataSource.save(Destination, {
        id,
        ...destination,
        order: orderInstance,
        recipient: {
          id,
          ...recipient,
        },
      });
      await dataSource.save(Departure, {
        id,
        ...departure,
        order: orderInstance,
        sender: {
          id,
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

    this.validateNotNull(requester);

    return requester;
  }

  async findMatchableOrderByDeliverId(deliverId: string) {
    const orderDetails = await this.repository.findOne({
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

    this.validateNotNull(orderDetails);

    return orderDetails;
  }

  async findAllCreatedOrDeliveredOrderDetailByOrderId(orderIds: number[]) {
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

    return order;
  }

  async updateDeliver(deliverId: string, orderId: number) {
    await this.repository.manager.transaction(async (manager) => {
      const deliver = await manager.findOneBy(User, { id: deliverId });

      this.validateNotNull(deliver);

      return manager.update(Order, { id: orderId }, { deliver });
    });
  }

  async deleteByOrderId(orderId: number) {
    await this.repository.delete(orderId);
  }
}
