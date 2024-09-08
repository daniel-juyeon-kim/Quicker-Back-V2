import { AverageOfCostAttributes } from "../../../maria/models/init-models";
import { validateNotZero, validateNumber } from "../../../util";
import { DistanceKeys, DistanceTable } from "../../types";

export class AverageTable {
  public create({ sumTable, countTable, date }: { sumTable: DistanceTable; countTable: DistanceTable; date: Date }) {
    const averageTable = this.createAverageOfCostTable();

    (Object.keys(sumTable) as DistanceKeys[]).forEach(this.calculate({ table: averageTable, sumTable, countTable }));

    this.assignCreatedDate(averageTable, date);

    return averageTable;
  }

  private calculate({
    table: averageTable,
    sumTable,
    countTable,
  }: {
    table: DistanceTable;
    sumTable: DistanceTable;
    countTable: DistanceTable;
  }) {
    return (key: DistanceKeys) => {
      try {
        averageTable[key] = this.calculateAverage(sumTable[key], countTable[key]);
      } catch {
        return;
      }
    };
  }

  private calculateAverage(sum: number, count: number) {
    this.validate(sum);
    this.validate(count);

    return Math.floor(sum / count);
  }

  private validate(value: number) {
    validateNumber(value);
    validateNotZero(value);
  }

  private assignCreatedDate(table: AverageOfCostAttributes, date: Date) {
    table.date = date.toISOString();
  }

  private createAverageOfCostTable() {
    return {
      date: "",
      "5KM": 0,
      "10KM": 0,
      "15KM": 0,
      "20KM": 0,
      "25KM": 0,
      "30KM": 0,
      "40KM": 0,
      "50KM": 0,
      "60KM": 0,
      "60+KM": 0,
    };
  }
}
