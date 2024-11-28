import express from "express";
import { orderDeliveryPersonController } from "../controllers";
import { validate } from "../validator";
import {
  patchOrderDeliveryPersonSchema,
  postDeliveryPersonCurrentLocationSchema,
} from "../validator/schema/routes/order/order-delivery-person-controller-request-data";
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

// PATCH /orders/{orderId}/delivery-person
router.patch(
  "/:orderId/delivery-person",
  validate(orderIdParamSchema, ["params"]),
  validate(patchOrderDeliveryPersonSchema, ["body"]),
  orderDeliveryPersonController.updateOrderDeliveryPerson,
);

export default router;
