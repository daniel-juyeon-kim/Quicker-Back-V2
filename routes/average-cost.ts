import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getMethodSchema } from "../validator/schema/routes/average-cost";

const router = express.Router();

// query: {
//   distance!: numeric & string
// }

// response {
//   code: 200
//   distance: number
// }

// response {
//   code: 400
//   error: 해당 거리의 데이터가 존재하지 않습니다.
// }

// GET /average/cost
router.get("/cost", validate(getMethodSchema, ["query"]), orderController.getAverageCost);

export default router;
