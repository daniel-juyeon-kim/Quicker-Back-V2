import { PriceAndDistance } from "../types";
import { AverageTable } from "./impl/average-table";
import { CountTable } from "./impl/count-table";
import { SumTable } from "./impl/sum-table";

export class TableService {
  private averageTable: AverageTable;
  private sumTable: SumTable;
  private countTable: CountTable;

  constructor({
    averageTable,
    sumTable,
    countTable,
  }: {
    averageTable: AverageTable;
    sumTable: SumTable;
    countTable: CountTable;
  }) {
    this.averageTable = averageTable;
    this.sumTable = sumTable;
    this.countTable = countTable;
  }

  createAverageTable(priceAndDistance: PriceAndDistance[]) {
    const sumTable = this.sumTable.create(priceAndDistance);
    const countTable = this.countTable.create(priceAndDistance);
    const averageTable = this.averageTable.create({ sumTable, countTable });

    return averageTable;
  }
}
