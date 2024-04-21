import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getMethodSchema } from "../validator/schema/routes/orders/detail";

const router = express.Router();

// GET /orders/detail
router.get("/", validate(getMethodSchema, ["query"]), orderController.orderlist)

export default router;