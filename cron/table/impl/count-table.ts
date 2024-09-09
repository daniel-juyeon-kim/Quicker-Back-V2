import { findDistanceKey } from "../../../util/distance";
import { DistanceTable, OrderInfo } from "../../types";
import { Table } from "../abstract/table";

export class CountTable extends Table {
  public create(orders: OrderInfo[]) {
    const table = this.createTable();

    this.calculate(orders, table);

    return table;
  }

  private calculate(orders: OrderInfo[], table: DistanceTable) {
    orders.forEach(({ km }) => {
      const key = findDistanceKey(km);

      table[key] += 1;
    });
  }
}
