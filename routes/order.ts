import express from "express";

import multer from "multer";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getOrderSchema, patchOrderSchema, postOrderSchema } from "../validator/schema/routes/order";
import {
  getOrderImageCompleteSchema,
  postOrderImageCompleteSchema,
} from "../validator/schema/routes/order/image/complete";
import { getOrderImageFailSchema, postOrderImageFailSchema } from "../validator/schema/routes/order/image/fail";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// GET /order

// query {
//   orderId: number
// }

// Response

// code: 200,
// message: "OK",
// body: {
//   id: number,
//   Destination: {
//     X: number,
//     Y: number
//   },
//   Departure: {
//     X: number,
//     Y: number
//   }
// }
router.get("/", validate(getOrderSchema, ["query"]), orderController.order);

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
router.post("/", validate(postOrderSchema, ["body"]), orderController.request);

// PATCH /order

// body {
//   userWalletAddress: string
//   orderId: number
// }

// Response

// code: 200,
// message: "OK"
router.patch("/", validate(patchOrderSchema, ["body"]), orderController.updateOrder);

// GET /order/image/fail

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

// POST /order/image/fail

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

// GET /order/image/complete

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

// POST /order/image/complete

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
