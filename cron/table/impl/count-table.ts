import { findDistanceKey } from "../../../util/distance";
import { PriceAndDistance } from "../../types";
import { AbstractTable } from "../abstract/table";

export class CountTable extends AbstractTable {
  public create(priceAndDistanceList: PriceAndDistance[]) {
    const table = this.createTable();

    priceAndDistanceList.forEach(({ km }) => {
      const key = findDistanceKey(km);

      table[key] += 1;
    });

    return table;
  }
}
