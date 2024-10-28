import express from "express";

import multer from "multer";
import { orderController } from "../controllers";
import { validate } from "../validator";
import {
  getOrderImageCompleteSchema,
  postOrderImageCompleteSchema,
} from "../validator/schema/routes/order/image/complete";
import { getOrderImageFailSchema, postOrderImageFailSchema } from "../validator/schema/routes/order/image/fail";
import {
  getOrderSchema,
  patchOrderDeliveryPersonSchema,
  postOrderSchema,
} from "../validator/schema/routes/order/order-controller-request-data";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// POST /order

// walletAddress: string,
// Order: {
//   id: number,
//   ID_REQ: string,
//   DETAIL: string
// },
// Transportation: {
//   ID: number,
//   WALKING: number,
//   BICYCLE: number,
//   SCOOTER: number,
//   BIKE: number,
//   CAR: number,
//   TRUCK: number
// },
// Destination: {
//   id: number,
//   X: number,
//   Y: number,
//   DETAIL: string
// },
// Departure: {
//   ID: number,
//   X: number,
//   Y: number,
//   DETAIL: string
// },
// Product: {
//   ID: number,
//   WIDTH: number,
//   LENGTH: number,
//   HEIGHT: number,
//   WEIGHT: number
// },
// Sender: {
//   ID: number,
//   NAME: string,
//   PHONE: string
// },
// Recipient: {
//   id: number,
//   NAME: string,
//   PHONE: string
// }

// Response

// code: 200,
// message: "OK"
router.post("/", validate(postOrderSchema, ["body"]), orderController.createOrder);

// PATCH /order -> /order/delivery-person

// body {
//   userWalletAddress: string
//   orderId: number
// }

// Response

// code: 200,
// message: "OK"
router.patch(
  "/delivery-person",
  validate(patchOrderDeliveryPersonSchema, ["body"]),
  orderController.updateOrderDeliveryPerson,
);

// GET /order -> /order/coordinates

// query {
//   orderId: number
// }

// Response

// code: 200,
// message: "OK",
// body: {
//   id: number,
//   destination: {
//     x: number,
//     y: number
//   },
//   departure: {
//     x: number,
//     y: number
//   }
// }
router.get("/coordinates", validate(getOrderSchema, ["query"]), orderController.getCoordinates);

// 배송이미지

// GET /order/image/fail -> /order/fail-image

// query {
//   orderId: "3" // string
// }

// code: 200,
// message: "OK",
// body: {
//   imageBuffer: {
//     type: string,
//     data: number[]
//   },
//   reason: string
// }
router.get("/image/fail", validate(getOrderImageFailSchema, ["query"]), orderController.getFailImage);

// POST /order/image/fail -> /order/fail-image

// body {
//   orderNum: "3" // string
//   reason: string
//   image: file
// }

// code: 200,
// message: "OK"
router.post(
  "/image/fail",
  validate(postOrderImageFailSchema, ["body"]),
  upload.single("image"),
  orderController.postFailImage,
);

// GET /order/image/complete -> /order/complete-image

// query {
//   orderId: "3" // string
// }

// code: 200,
// message: "OK",
// body: {
//   imageBuffer: {
//     type: string,
//     data: number[]
//   }
// }
router.get("/image/complete", validate(getOrderImageCompleteSchema, ["query"]), orderController.getImage);

// POST /order/image/complete -> /order/complete-image

// body {
//   orderNum: number
//   uploadImage: file
// }

// code: 200,
// message: "OK",
router.post(
  "/image/complete",
  validate(postOrderImageCompleteSchema, ["body"]),
  upload.single("uploadImage"),
  orderController.postImage,
);

export default router;
