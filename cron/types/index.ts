import { AverageOfCostAttributes } from "../../maria/models/AverageOfCost";

export type DistanceKeys = Exclude<keyof AverageOfCostAttributes, "date">;
export type Distance = { orderId: number; km: number };
export type OrderPrice = { orderNumber: number; price: number };
type TableValue = { price: number; km: number };

export type DistanceTable = {
  [K in DistanceKeys]: number;
};

export type OrderInfo = { id: number } & TableValue;
