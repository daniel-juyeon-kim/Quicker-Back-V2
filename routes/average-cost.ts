import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getAverageCostSchema } from "../validator/schema/routes/average-cost";

const router = express.Router();

// GET /average/cost

// query: {
//   distance: "423" // string
// }

// code: 200
// message: "OK"
// body: {
//   distance: number
// }
router.get("/cost", validate(getAverageCostSchema, ["query"]), orderController.getAverageCost);

export default router;
