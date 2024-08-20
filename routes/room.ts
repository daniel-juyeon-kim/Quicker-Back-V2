import express from "express";

import { chatController, orderController } from "../controllers";
import { validate } from "../validator";
import { getRoomMessageSchema, getRoomSchema } from "../validator/schema/routes/room";

const router = express.Router();

// GET /room

// query {
//   orderNum: "1" // string
// }

// Response

// code: 200
// message: "OK"
// body {
//   id: number,
//   Sender: {
//     PHONE: string,
//     Departure: {
//       ID: number,
//       X: number,
//       Y: number,
//     },
//   },
//   Recipient: {
//     PHONE: string,
//     Destination: {
//       id: number,
//       X: number,
//       Y: number,
//     },
//   },
// };
router.get("/", validate(getRoomSchema, ["query"]), orderController.getRoomInfo);

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
