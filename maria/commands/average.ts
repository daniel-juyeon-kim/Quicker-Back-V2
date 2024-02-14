import { Op } from "sequelize";
import { AverageOfCost, AverageOfCostAttributes } from "../models/init-models";

export class AverageModel {
  async findLastMonthCost(distanceUnit: string) {
    const recentDate = (await AverageOfCost.max("date")) as string;
    return AverageOfCost.findOne({
      attributes: [distanceUnit],
      where: {
        date: {
          [Op.eq]: recentDate,
        },
      },
      raw: true,
      nest: true,
    });
  }
  create(average: AverageOfCostAttributes) {
    AverageOfCost.create(average);
  }
}