import express from "express";

import { chatController } from "../controllers";
import { validate } from "../validator";
import { getChatRecentMessageSchema } from "../validator/schema/routes/chat/chat-controller-request-data";

const router = express.Router();

// GET /chat/{roomId}/recent-message/
router.get(
  "/:roomId/recent-message",
  validate(getChatRecentMessageSchema, ["params"]),
  chatController.getRecentMessage,
);

export default router;
