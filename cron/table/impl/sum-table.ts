import { findDistanceKey } from "../../../util/distance";
import { DistanceTable, OrderInfo } from "../../types";
import { Table } from "../abstract/table";

export class SumTable extends Table {
  public create(orders: OrderInfo[]) {
    const table = this.createTable();

    this.calculate(orders, table);

    return table;
  }

  private calculate(orders: OrderInfo[], table: DistanceTable) {
    orders.forEach(({ km, price }) => {
      const key = findDistanceKey(km);

      table[key] += price;
    });
  }
}
