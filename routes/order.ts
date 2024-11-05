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

// GET /order/complete-image
router.get(
  "/complete-image",
  validate(getOrderCompleteImageSchema, ["query"]),
  orderCompeteImageController.getCompleteImageBuffer,
);

// POST /order/complete-image
router.post(
  "/image/complete",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderImageCompleteSchema, ["body"]),
  orderCompeteImageController.postCompleteImageBuffer,
);

// GET /order/{orderId}/sender-receiver-info
router.get(
  "/:orderId/sender-receiver-info/",
  validate(getSenderReceiverInfoSchema, ["params"]),
  orderSenderReceiverController.getSenderReceiverInfo,
);

export default router;
