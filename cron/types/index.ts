import { AverageOfCostAttributes } from "../../maria/models/AverageOfCost";

export type DistanceKeys = Exclude<keyof AverageOfCostAttributes, "date">;
export type Distance = { orderId: number; km: number };
export type Price = { orderNumber: number; price: number };
type TableValue = { price: number; km: number };

export type Table = {
  [Key in DistanceKeys]: number;
};

export type Order = { id: number } & TableValue;
