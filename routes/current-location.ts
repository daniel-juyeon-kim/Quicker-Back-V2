import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import { getMethodSchema, postMethodSchema } from "../validator/schema/routes/current-deliver-location"

const router = express.Router();

// query {
//   quicker: string // address
// }

// response {
//   X : number,
//   Y : number
// }

// GET /current-deliver-location
router.get("/", validate(getMethodSchema, ["query"]), orderController.getLocation)

// body {
//   X: number
//   Y: number
//   address: string // walletAddress
// }

// POST /current-deliver-location
router.post("/",validate(postMethodSchema, ["body"]), orderController.postLocation);

export default router;