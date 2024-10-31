import express from "express";

import multer from "multer";
import { orderController, orderFailImageController, orderLocationController } from "../controllers";
import { validate } from "../validator";
import { validateSingleImageFile } from "../validator/file-validator";
import {
  getOrderImageCompleteSchema,
  postOrderImageCompleteSchema,
} from "../validator/schema/routes/order/image/complete";
import {
  getOrderCoordinatesSchema,
  patchOrderDeliveryPersonSchema,
  postOrderSchema,
} from "../validator/schema/routes/order/order-controller-request-data";
import {
  getOrderFailImageSchema,
  postOrderFailImageSchema,
} from "../validator/schema/routes/order/order-fail-image-controller-request-data";

const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage }).single("image");

const router = express.Router();

// POST /order
router.post("/", validate(postOrderSchema, ["body"]), orderController.createOrder);

// PATCH /order/delivery-person
router.patch(
  "/delivery-person",
  validate(patchOrderDeliveryPersonSchema, ["body"]),
  orderController.updateOrderDeliveryPerson,
);

// GET /order/coordinates
router.get("/coordinates", validate(getOrderCoordinatesSchema, ["query"]), orderLocationController.getCoordinates);

// GET /order/fail-image
router.get("/fail-image", validate(getOrderFailImageSchema, ["query"]), orderFailImageController.getFailImage);

// POST /order/image/fail -> /order/fail-image
router.post(
  "/fail-image",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderFailImageSchema, ["body"]),
  orderFailImageController.postFailImage,
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
  uploadImage,
  orderController.postImage,
);

export default router;
