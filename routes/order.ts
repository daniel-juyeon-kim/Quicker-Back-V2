import express from "express";

import { orderController, orderLocationController, orderSenderReceiverController } from "../controllers";
import { validate } from "../validator";
import { postOrderSchema } from "../validator/schema/routes/order/order-controller-request-data";
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

router.use("/", deliveryPerson);

export default router;
