import { AverageOfCost, DistanceUnit } from "../../entity/average-of-cost.entity";
import { AbstractRepository } from "../abstract-repository";

export class AverageOfCostRepository extends AbstractRepository<AverageOfCost> {
  protected readonly entity = AverageOfCost;
  protected readonly repository = this.dataSource.getRepository(this.entity);

  async findLastMonthAverageCost(distanceUnit: DistanceUnit) {
    const average = await this.repository.find({
      take: 1,
      order: { date: "DESC" },
      select: { [distanceUnit]: true },
    });

    this.validateNull(average[0]);

    return average[0];
  }

  async createAverage(averageOfCost: AverageOfCost) {
    await this.repository.save(averageOfCost);
  }
}
