import { existStringTypeInt } from "../../util";

export interface ChatControllerRequestData {
  getRecentMessage: {
    roomId: string;
  };
}

// GET /chat/{roomId}/recent-message
export const getChatRecentMessageSchema = {
  roomId: existStringTypeInt,
};
