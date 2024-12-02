import { DistanceKeys, Table } from "../../types";
import { AbstractTable } from "../abstract/table";

export class AverageTable extends AbstractTable {
  public create({ sumTable, countTable }: { sumTable: Table; countTable: Table }) {
    const averageTable = this.createTable();
    const sumTableKeys = Object.keys(sumTable) as DistanceKeys[];

    sumTableKeys.forEach((key) => {
      // 0 / 0 이 존재할 수 있음
      if (sumTable[key] === 0 || countTable[key] === 0) {
        return;
      }

      averageTable[key] = this.calculateAverage(sumTable[key], countTable[key]);
    });

    return averageTable;
  }

  private calculateAverage(sum: number, count: number) {
    return Math.floor(sum / count);
  }
}
