import { OrderInfo } from "../types";
import { AverageTable } from "./impl/average-table";
import { CountTable } from "./impl/count-table";
import { SumTable } from "./impl/sum-table";

export class TableService {
  constructor(
    private averageTable: AverageTable,
    private sumTable: SumTable,
    private countTable: CountTable,
  ) {}

  createAverageTable(orderInfos: OrderInfo[]) {
    const sumTable = this.sumTable.create(orderInfos);
    const countTable = this.countTable.create(orderInfos);
    const averageTable = this.averageTable.create({ sumTable, countTable, date: new Date() });

    return averageTable;
  }
}
