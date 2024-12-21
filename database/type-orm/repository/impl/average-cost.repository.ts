import { Repository } from "typeorm";
import { UnknownDataBaseError } from "../../../../core";
import { AverageOfCost, DistanceUnit } from "../../entity/average-of-cost.entity";
import { DuplicatedDataError, NotExistDataError } from "../../util";
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

      this.validateNotNull(lastMonth, average);

      return average[distanceUnit];
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }

  async createAverage(averageOfCost: Omit<AverageOfCost, "date">, date: Date) {
    try {
      await this.repository.manager.transaction(async (manager) => {
        if (await manager.existsBy(AverageOfCost, { date })) {
          throw new DuplicatedDataError(`${date}에 해당되는 데이터가 이미 존재합니다.`);
        }

        await this.repository.insert({ ...averageOfCost, date });
      });
    } catch (error) {
      if (error instanceof DuplicatedDataError) {
        throw error;
      }
      throw new UnknownDataBaseError(error);
    }
  }
}
