import { Order } from "../types";
import { AverageTable } from "./impl/average-table";
import { CountTable } from "./impl/count-table";
import { SumTable } from "./impl/sum-table";

export class TableService {
  private averageTable: AverageTable;
  private sumTable: SumTable;
  private countTable: CountTable;

  constructor({ averageTable, sumTable, countTable }: Dependency) {
    this.averageTable = averageTable;
    this.sumTable = sumTable;
    this.countTable = countTable;
  }

  createAverageTable(orderInfos: Order[]) {
    const sumTable = this.sumTable.create(orderInfos);
    const countTable = this.countTable.create(orderInfos);
    const averageTable = this.averageTable.create({ sumTable, countTable, date: new Date() });

    return averageTable;
  }
}

type Dependency = {
  averageTable: AverageTable;
  sumTable: SumTable;
  countTable: CountTable;
};
