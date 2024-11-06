import express from "express";

import multer from "multer";
import {
  orderCompeteImageController,
  orderController,
  orderFailImageController,
  orderLocationController,
  orderSenderReceiverController,
} from "../controllers";
import { validate } from "../validator";
import { validateSingleImageFile } from "../validator/file-validator/file-validator";
import {
  getOrderCompleteImageSchema,
  postOrderImageCompleteSchema,
} from "../validator/schema/routes/order/order-complete-image-controller.request-data";
import {
  getOrderCoordinatesSchema,
  patchOrderDeliveryPersonSchema,
  postOrderSchema,
} from "../validator/schema/routes/order/order-controller-request-data";
import {
  getOrderFailImageSchema,
  postOrderFailImageSchema,
} from "../validator/schema/routes/order/order-fail-image-controller-request-data";
import { getSenderReceiverInfoSchema } from "../validator/schema/routes/order/order-sender-receiver-controller-request-data";
import { orderIdParamSchema } from "../validator/schema/routes/params";

const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage }).single("image");

const router = express.Router();

// POST /orders
router.post("/", validate(postOrderSchema, ["body"]), orderController.createOrder);

// PATCH /orders/{orderId}/delivery-person
router.patch(
  "/:orderId/delivery-person",
  validate(orderIdParamSchema, ["params"]),
  validate(patchOrderDeliveryPersonSchema, ["body"]),
  orderController.updateOrderDeliveryPerson,
);

// GET /orders/coordinates
router.get("/coordinates", validate(getOrderCoordinatesSchema, ["query"]), orderLocationController.getCoordinates);

// GET /orders/{orderId}/sender-receiver-info
router.get(
  "/:orderId/sender-receiver-info/",
  validate(getSenderReceiverInfoSchema, ["params"]),
  orderSenderReceiverController.getSenderReceiverInfo,
);

// GET /orders/fail-image
router.get("/fail-image", validate(getOrderFailImageSchema, ["query"]), orderFailImageController.getFailImage);

// POST /orders/fail-image
router.post(
  "/fail-image",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderFailImageSchema, ["body"]),
  orderFailImageController.postFailImage,
);

// GET /orders/complete-image
router.get(
  "/complete-image",
  validate(getOrderCompleteImageSchema, ["query"]),
  orderCompeteImageController.getCompleteImageBuffer,
);

// POST /orders/complete-image
router.post(
  "/image/complete",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderImageCompleteSchema, ["body"]),
  orderCompeteImageController.postCompleteImageBuffer,
);

// GET /orders/sender-receiver-info
router.get(
  "/:orderId/sender-receiver-info/",
  validate(getSenderReceiverInfoSchema, ["params"]),
  orderSenderReceiverController.getSenderReceiverInfo,
);

export default router;
