import { Repository } from "typeorm";
import { UnknownDataBaseError } from "../../../../core";
import { AverageOfCost, DistanceUnit } from "../../entity/average-of-cost.entity";
import { NotExistDataError } from "../../util";
import { AbstractRepository } from "../abstract-repository";

export class AverageCostRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<AverageOfCost>) {
    super();
  }

  async findAverageCostByDateAndDistanceUnit({
    distanceUnit,
    lastMonth,
  }: {
    distanceUnit: DistanceUnit;
    lastMonth: Date;
  }) {
    try {
      const average = await this.repository.findOne({
        where: { date: lastMonth },
        select: { [distanceUnit]: true },
      });

      this.validateNotNull(average);

      return average[distanceUnit];
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${lastMonth}에 해당되는 데이터가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async createAverage(averageOfCost: AverageOfCost) {
    await this.repository.save(averageOfCost);
  }
}
