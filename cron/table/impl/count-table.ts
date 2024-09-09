import { findDistanceKey } from "../../../util/distance";
import { Order, Table } from "../../types";
import { AbstractTable } from "../abstract/table";

export class CountTable extends AbstractTable {
  protected calculate(table: Table) {
    return ({ km }: Order) => {
      const key = findDistanceKey(km);

      table[key] += 1;
    };
  }
}
