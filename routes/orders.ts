import express from "express";

import { orderController } from "../controllers";
import { validate } from "../validator";
import { getOrdersSchema } from "../validator/schema/routes/orders";
import { getOrdersDetailSchema } from "../validator/schema/routes/orders/detail";

const router = express.Router();

// 배송가능한 주문 조회
// GET /orders

// query {
//   walletAddress: string
// }

// code: 200,
// message: "OK",
// body: {
//   id: number,
//   DETAIL: string | null,
//   Transportation: {
//     WALKING: number,
//     BICYCLE: number,
//     SCOOTER: number,
//     BIKE: number,
//     CAR: number,
//     TRUCK: number
//   },
//   Destination: {
//     X: number,
//     Y: number,
//     DETAIL: string
//   },
//   Departure: {
//     X: number,
//     Y: number,
//     DETAIL: string
//   },
//   Product: {
//     WIDTH: number,
//     LENGTH: number,
//     HEIGHT: number,
//     WEIGHT: number
//   }[]
// }
router.get("/", validate(getOrdersSchema, ["query"]), orderController.getRequests);

// 내가 배송하거나 주문한 의뢰 확인
// GET /orders/detail

// query {
//   orderIds: 1,2,3 string
// }

// code: 200,
// message: "OK",
// body: {
//   id: number,
//   DETAIL: string,
//   Destination: {
//     X: number,
//     Y: number,
//     DETAIL: string
//   },
//   Departure: {
//     X: number,
//     Y: number,
//     DETAIL: string
//   },
//   Recipient: {
//     NAME: string,
//     PHONE: string
//   },
//   Sender: {
//     NAME: string,
//     PHONE: string
//   },
//   Product: {
//     WIDTH: number,
//     LENGTH: number,
//     HEIGHT: number,
//     WEIGHT: number
//   }[]
// }
router.get("/detail", validate(getOrdersDetailSchema, ["query"]), orderController.orderlist);

export default router;
