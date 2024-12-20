import { AverageOfCost } from "../../database";

export type DistanceKeys = Exclude<keyof AverageOfCost, "date">;
export type Distance = { orderId: number; km: number };
export type Price = { orderNumber: number; price: number };
export type Table = {
  [Key in DistanceKeys]: number;
};
export type PriceAndDistance = {
  id: number;
  km: number;
  price: number;
};
