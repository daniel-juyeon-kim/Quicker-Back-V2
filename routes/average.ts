import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getAverageCostSchema } from "../validator/schema/routes/average";

const router = express.Router();

// GET orders/average/cost/latest?distance={distance}
router.get("/cost/latest", validate(getAverageCostSchema, ["query"]), orderController.getLatestAverageCost);

export default router;
