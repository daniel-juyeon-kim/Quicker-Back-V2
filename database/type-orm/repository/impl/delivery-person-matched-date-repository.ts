import { Between, EntityManager, Repository } from "typeorm";

import { UnknownDataBaseError } from "../../../../core";
import { isNull } from "../../../../util";
import { DeliveryPersonMatchedDate } from "../../entity";
import { DuplicatedDataError } from "../../util";
import { AbstractRepository } from "../abstract-repository";

export class DeliveryPersonMatchedDateRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<DeliveryPersonMatchedDate>) {
    super();
  }

  async create(manager: EntityManager, orderId: number) {
    try {
      const existMatchedDate = await manager.findOneBy(DeliveryPersonMatchedDate, { id: orderId });

      if (!isNull(existMatchedDate)) {
        throw new DuplicatedDataError(`${orderId}에 대해 중복된 데이터가 존재합니다.`);
      }

      const matchedDate = new DeliveryPersonMatchedDate();
      matchedDate.id = orderId;

      await manager.insert(DeliveryPersonMatchedDate, matchedDate);
    } catch (error) {
      if (error instanceof DuplicatedDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async findAllOrderIdByBetweenDates(startDate: Date, endDate: Date) {
    const orderIds = await this.repository.find({
      select: { id: true },
      where: { date: Between(startDate, endDate) },
    });

    this.validateNotNull(orderIds);

    return orderIds;
  }
}
