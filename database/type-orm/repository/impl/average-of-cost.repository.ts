import { Repository } from "typeorm";
import { AverageOfCost, DistanceUnit } from "../../entity/average-of-cost.entity";
import { AbstractRepository } from "../abstract-repository";

export class AverageOfCostRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<AverageOfCost>) {
    super();
  }

  async findLastMonthAverageCost(distanceUnit: DistanceUnit) {
    const average = await this.repository.findOne({
      order: { date: "DESC" },
      where: {},
      select: { [distanceUnit]: true },
    });

    this.validateNotNull(average);

    return average;
  }

  async createAverage(averageOfCost: AverageOfCost) {
    await this.repository.save(averageOfCost);
  }
}
