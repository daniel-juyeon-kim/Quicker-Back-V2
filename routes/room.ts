import express from "express";
import { orderController } from "../controllers";
import { validate } from "../validator";
import {getMethodSchema} from "../validator/schema/routes/room"
import MessageRouter from "./room-message";

const router = express.Router();

// query {
//   orderNum: string
// }

// response

// code : 200
// message : OK

// code : 400
// message : BadRequest

// GET /room
router.get("/", validate(getMethodSchema, ["query"]), orderController.getRoomInfo);

router.use("/message", MessageRouter);

export default router