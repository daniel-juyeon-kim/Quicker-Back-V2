import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { postCurrentDeliverLocationSchema } from "../validator/schema/routes/current-deliver-location";

const router = express.Router();

// POST /current-deliver-location

// body {
//   X: number
//   Y: number
//   address: string // 지갑주소
// }

// code: 200,
// message: "OK",
router.post("/", validate(postCurrentDeliverLocationSchema, ["body"]), orderController.postLocation);

export default router;
