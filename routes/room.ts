import express from "express";

import { validate } from "../validator";
import { getRoomMessageSchema } from "../validator/schema/routes/chat-room/chat-room-controller-request-data";

const router = express.Router();

// GET /room/message

// query: {
//   orderNum: "1" // string
// }

// Response

// code: 200,
// message: "OK",
// body: {
//   id: "0x5bac0b7d...",
//   message: string,
//   date: "2023-08-22T05:51:26.072Z"
// }
router.get("/message", validate(getRoomMessageSchema, ["query"]), chatController.getRecentMessage);

export default router;
