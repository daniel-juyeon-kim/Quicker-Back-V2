import { AverageTable } from "./impl/average-table";
import { CountTable } from "./impl/count-table";
import { SumTable } from "./impl/sum-table";
import { TableService } from "./table-service";

const averageTable = new AverageTable();
const sumTable = new SumTable();
const countTable = new CountTable();

export const tableService = new TableService(averageTable, sumTable, countTable);

export { TableService } from "./table-service";
