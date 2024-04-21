import express from "express";

import { orderController, userController } from "../controllers";
import DetailRouter from "./orders-detail";

import { validate } from "../validator";
import { getMethodSchema } from "../validator/schema/routes/orders";

const router = express.Router();

// GET /orders
router.get("/", validate(getMethodSchema, ["query"]), orderController.getRequests);

router.use("/detail", DetailRouter)

export default router;