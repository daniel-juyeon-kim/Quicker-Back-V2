import express from "express"
import { orderController } from "../controllers";

const router = express.Router();

// GET /average/cost
router.get("/cost", orderController.getAverageCost)

export default router;
