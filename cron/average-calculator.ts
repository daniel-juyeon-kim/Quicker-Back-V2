import { AverageOfCostAttributes } from "../maria/models/AverageOfCost";
import { isUndefined } from "../util";
import { Distance, OrderInfo } from "./types";
import { createAverageTable } from "./util";

export class AverageCalculator {
  private readonly DISTANCE_UNITS = [5, 10, 15, 20, 25, 30, 40, 50, 60] as const;

  public calculateAverage(orderInfos: OrderInfo[]) {
    const { countTable, sumTable } = this.createSumAndCountTables(orderInfos);
    return this.calculateAverageTable(countTable, sumTable);
  }

  private createSumAndCountTables(orderInfos: OrderInfo[]) {
    const sumTable = createAverageTable();
    const countTable = createAverageTable();

    orderInfos.forEach((orderInfo) => {
      const distanceUnitKey = this.DISTANCE_UNITS.find((distanceUnit) => orderInfo.km <= distanceUnit);

      const key: Distance = isUndefined(distanceUnitKey) ? "60+KM" : `${distanceUnitKey}KM`;

      sumTable[key] += orderInfo.price;
      countTable[key] += 1;
    });

    return { countTable, sumTable };
  }

  private calculateAverageTable = (countTable: AverageOfCostAttributes, sumTable: AverageOfCostAttributes) => {
    const averageTable = createAverageTable();

    Object.keys(countTable)
      .filter((propertyKey): propertyKey is Distance => propertyKey !== "date")
      .filter((propertyKey) => countTable[propertyKey] !== 0)
      .forEach((propertyKey) => {
        const average = Math.floor(sumTable[propertyKey] / countTable[propertyKey]);
        averageTable[propertyKey] = average;
      });

    return averageTable;
  };
}
