import { findDistanceKey } from "../../../util/distance";
import { PriceAndDistance } from "../../types";
import { AbstractTable } from "../abstract/table";

export class SumTable extends AbstractTable {
  public create(priceAndDistanceList: PriceAndDistance[]) {
    const table = this.createTable();

    priceAndDistanceList.forEach(({ price, km }) => {
      const key = findDistanceKey(km);

      table[key] += price;
    });

    return table;
  }
}
