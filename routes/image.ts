import express from "express";

import multer from "multer";
import { orderCompeteImageController, orderFailImageController } from "../controllers";
import { validate } from "../validator";
import { validateSingleImageFile } from "../validator/file-validator/file-validator";
import { postOrderImageCompleteSchema } from "../validator/schema/routes/order/order-complete-image-controller.request-data";
import { postOrderFailImageSchema } from "../validator/schema/routes/order/order-fail-image-controller-request-data";
import { orderIdParamSchema } from "../validator/schema/routes/params";

const storage = multer.memoryStorage();
const uploadImage = multer({ storage }).single("image");

const router = express.Router();

// GET /orders/{orderId}/image/fail
router.get("/:orderId/image/fail", validate(orderIdParamSchema, ["params"]), orderFailImageController.getFailImage);

// POST /orders/image/fail
router.post(
  "/image/fail",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderFailImageSchema, ["body"]),
  orderFailImageController.postFailImage,
);

// GET /orders/{orderId}/image/complete
router.get(
  "/:orderId/image/complete",
  validate(orderIdParamSchema, ["params"]),
  orderCompeteImageController.getCompleteImageBuffer,
);

// POST /orders/image/complete
router.post(
  "/image/complete",
  uploadImage,
  validateSingleImageFile,
  validate(postOrderImageCompleteSchema, ["body"]),
  orderCompeteImageController.postCompleteImageBuffer,
);

export default router;
