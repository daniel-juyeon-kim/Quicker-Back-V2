import { Between, DataSource } from "typeorm";
import { CacheMatchedOrder } from "../../entity/cache-matched-order.entity";
import { AbstractRepository } from "../abstract-repository";

export class CacheOrderRepository extends AbstractRepository<CacheMatchedOrder> {
  constructor(dataSource: DataSource) {
    super(dataSource, CacheMatchedOrder);
  }

  async create(orderId: number) {
    const order = this.repository.create({
      id: orderId,
    });

    await this.repository.save(order);
  }

  async findOrderIdsByBetweenDates(startDate: Date, endDate: Date) {
    const order = await this.repository.find({
      select: { id: true },
      where: { date: Between(startDate, endDate) },
    });

    this.validateNull(order);

    return order;
  }
}
