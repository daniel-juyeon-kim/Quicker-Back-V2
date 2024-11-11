import express from "express";

import {
  orderController,
  orderDeliveryPersonController,
  orderLocationController,
  orderSenderReceiverController,
} from "../controllers";
import { validate } from "../validator";
import {
  patchOrderDeliveryPersonSchema,
  postOrderSchema,
} from "../validator/schema/routes/order/order-controller-request-data";
import { getOrdersDetailSchema } from "../validator/schema/routes/orders/detail";
import { orderIdParamSchema } from "../validator/schema/routes/params";
import { walletAddressSchema } from "../validator/schema/routes/query";
import deliveryPerson from "./delivery-person";
import imageRouter from "./image";

const router = express.Router();

// POST /orders
router.post("/", validate(postOrderSchema, ["body"]), orderController.createOrder);

// GET /orders/matchable?walletAddress={walletAddress}
router.get("/matchable", validate(walletAddressSchema, ["query"]), orderController.getMatchableOrdersByWalletAddress);

// GET /orders/{orderId}/coordinates
router.get("/:orderId/coordinates", validate(orderIdParamSchema, ["params"]), orderLocationController.getCoordinates);

// GET /orders/{orderId}/sender-receiver-info
router.get(
  "/:orderId/sender-receiver-info/",
  validate(orderIdParamSchema, ["params"]),
  orderSenderReceiverController.getSenderReceiverInfo,
);

// GET /orders/{orderIds}/detail
router.get("/:orderIds/detail", validate(getOrdersDetailSchema, ["params"]), orderController.getOrdersDetail);

router.use("/", imageRouter);

// POST /orders/delivery-person/location
router.use("/current-deliver-location", deliveryPerson);

// GET /orders/{orderId}/delivery-person/location
router.get(
  "/:orderId/delivery-person/location",
  validate(orderIdParamSchema, ["params"]),
  orderDeliveryPersonController.getDeliveryPersonCurrentLocation,
);

// PATCH /orders/{orderId}/delivery-person
router.patch(
  "/:orderId/delivery-person",
  validate(orderIdParamSchema, ["params"]),
  validate(patchOrderDeliveryPersonSchema, ["body"]),
  orderController.updateOrderDeliveryPerson,
);

export default router;
