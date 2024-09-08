import { isUndefined } from "../../../util";
import { DistanceKeys } from "../../types";

export abstract class Table {
  private readonly DISTANCES = [5, 10, 15, 20, 25, 30, 40, 50, 60, 60] as const;

  protected findTableKey(km: number): DistanceKeys {
    const value = this.DISTANCES.find((DISTANCE) => km <= DISTANCE);

    return isUndefined(value) ? "60+KM" : `${value}KM`;
  }

  protected createTable() {
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
