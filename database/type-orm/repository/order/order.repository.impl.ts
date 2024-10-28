import { In, IsNull, Not, Repository } from "typeorm";
import { UnknownDataBaseError } from "../../../../core";
import { isNull } from "../../../../util";
import { Departure, Destination, Order, Product, Transportation, User } from "../../entity";
import { BusinessRuleConflictDataError, NotExistDataError } from "../../util";
import { AbstractRepository } from "../abstract-repository";
import { OrderRepository } from "./order.repository";

export class OrderRepositoryImpl extends AbstractRepository implements OrderRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
  }

  async updateDeliveryPersonAtOrder(
    manager: Parameters<OrderRepository["updateDeliveryPersonAtOrder"]>[0],
    { orderId, walletAddress }: Parameters<OrderRepository["updateDeliveryPersonAtOrder"]>[1],
  ) {
    try {
      const deliverPerson = await manager.findOneBy(User, { walletAddress });

      if (isNull(deliverPerson)) {
        throw new NotExistDataError(`${walletAddress} 에 대응되는 사용자가 존재하지 않습니다.`);
      }

      const order = await manager.findOne(Order, {
        relations: { requester: true },
        select: {
          requester: { walletAddress: true },
        },
        where: { id: orderId },
      });

      if (isNull(order)) {
        throw new NotExistDataError(`${orderId} 에 대응되는 주문이 존재하지 않습니다.`);
      }

      if (deliverPerson.walletAddress === order.requester.walletAddress) {
        throw new BusinessRuleConflictDataError(`${walletAddress}가 의뢰인의 지갑주소와 동일합니다.`);
      }

      await manager.update(Order, { id: orderId }, { deliveryPerson: deliverPerson });
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw error;
      } else if (error instanceof BusinessRuleConflictDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async create({
    walletAddress,
    detail,
    receiver,
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
          receiver: {
            id,
            ...receiver,
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
        deliveryPerson: true,
      },
      where: { id: orderId },
      select: {
        id: true,
        requester: { id: true },
        deliveryPerson: { id: true },
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
        deliveryPerson: { id: IsNull() },
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
          receiver: true,
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
          receiver: {
            name: true,
            phone: true,
          },
        },
      },
    });

    return order;
  }

  async deleteByOrderId(orderId: number) {
    await this.repository.delete(orderId);
  }
}
