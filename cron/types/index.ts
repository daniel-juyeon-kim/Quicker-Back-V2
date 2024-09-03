import { AverageOfCostAttributes } from "../../maria/models/AverageOfCost";

export type Distance = Exclude<keyof AverageOfCostAttributes, "date">;
export type DeliverDistance = { orderId: number; km: number };
export type OrderPrice = { orderNumber: number; price: number };
export type OrderInfo = Omit<OrderPrice, "orderNumber"> & DeliverDistance;
