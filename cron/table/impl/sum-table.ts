import { findDistanceKey } from "../../../util/distance";
import { Order, Table } from "../../types";
import { AbstractTable } from "../abstract/table";

export class SumTable extends AbstractTable {
  protected calculate(table: Table) {
    return ({ km, price }: Order) => {
      const key = findDistanceKey(km);

      table[key] += price;
    };
  }
}
