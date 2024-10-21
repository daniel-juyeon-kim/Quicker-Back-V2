import { In, IsNull, Not, Repository } from "typeorm";
import { UnknownDataBaseError } from "../../../../core";
import { Departure, Destination, Order, Product, Transportation, User } from "../../entity";
import { NotExistDataError } from "../../util";
import { AbstractRepository } from "../abstract-repository";
import { OrderRepository } from "./order.repository";

export class OrderRepositoryImpl extends AbstractRepository implements OrderRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
  }

  async create({
    walletAddress,
    detail,
    recipient,
    destination,
    sender,
    departure,
    product,
    transportation,
  }: Parameters<OrderRepository["create"]>[0]) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        const requester = await manager.findOneBy(User, { walletAddress });

        this.validateNotNull(requester);

        const order = manager.create(Order, {
          detail,
          requester,
        });

        await manager.save(Order, order);

        const id = order.id;

        await manager.save(Product, {
          id,
          ...product,
          order: order,
        });
        await manager.save(Transportation, {
          id,
          ...transportation,
          order: order,
        });
        await manager.save(Destination, {
          id,
          ...destination,
          order: order,
          recipient: {
            id,
            ...recipient,
          },
        });
        await manager.save(Departure, {
          id,
          ...departure,
          order: order,
          sender: {
            id,
            ...sender,
          },
        });
      });
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${walletAddress} 에 해당되는 사용자를 찾지 못했습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
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
