import { Order, Table } from "../../types";

export abstract class AbstractTable {
  public create(orders: Order[]) {
    const table = this.createTable();

    orders.forEach(this.calculate(table));

    return table;
  }

  protected abstract calculate(table: Table): ForEachCallBackFn;

  private createTable() {
    return {
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

type ForEachCallBackFn = Parameters<Array<Order>["forEach"]>[0];
