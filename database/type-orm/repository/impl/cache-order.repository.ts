import { Between, Repository } from "typeorm";
import { CacheMatchedOrder } from "../../entity/cache-matched-order.entity";
import { AbstractRepository } from "../abstract-repository";

export class CacheOrderRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<CacheMatchedOrder>) {
    super();
  }

  async create(orderId: number) {
    const cacheMatchedOrder = new CacheMatchedOrder();
    cacheMatchedOrder.id = orderId;

    await this.repository.save(cacheMatchedOrder);
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
