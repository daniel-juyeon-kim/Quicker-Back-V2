import express from "express";

import { orderController } from "../controllers";
import OrderFailImage from "./order-fail-image";
import OrderCompleteImage from "./order-complete-image";

require("dotenv").config();

const router = express.Router();

// 테스트 완료
// GET /order
router.get("/", orderController.order)
// POST /order
router.post("/", orderController.request);

router.use("/image/fail", OrderFailImage);
router.use("/image/complete", OrderCompleteImage);

// 테스트 필요
// PATCH /order
router.patch("/", orderController.updateOrder);

export default router;