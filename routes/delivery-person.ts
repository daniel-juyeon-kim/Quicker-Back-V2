import express from "express";
import { orderDeliveryPersonController } from "../controllers";
import { validate } from "../validator";
import { postDeliveryPersonCurrentLocationSchema } from "../validator/schema/routes/current-deliver-location";
import { orderIdParamSchema } from "../validator/schema/routes/params";

const router = express.Router();

// GET /orders/{orderId}/delivery-person/location
router.get(
  "/:orderId/delivery-person/location",
  validate(orderIdParamSchema, ["params"]),
  orderDeliveryPersonController.getDeliveryPersonCurrentLocation,
);

// POST /orders/delivery-person/location
router.post(
  "/delivery-person/location",
  validate(postDeliveryPersonCurrentLocationSchema, ["body"]),
  orderDeliveryPersonController.postDeliveryPersonCurrentLocation,
);

export default router;
