import express from "express";
import { validate } from "../validator";
import { chatController } from "../controllers";
import { getMethodSchema } from "../validator/schema/routes/room/message";

const router = express.Router();

// query: {
//   orderNum: string
// }

// Response

/**
 * code : 200
 * message : OK
 * body : {
 *  roomName: string,
 *  id: string,
 *  message: string,
 *  date : { type: Date, default: Date.now }
 * }
 */

// code : 400
// message : BadRequest

// GET /room/message
router.get("/", validate(getMethodSchema, ["query"]), chatController.getRecentMessage);

export default router