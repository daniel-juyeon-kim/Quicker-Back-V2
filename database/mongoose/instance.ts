import mongoose from "mongoose";

import { ChatMessageSchema, CompleteDeliveryImageSchema, FailDeliveryImageSchema } from "./models";
import { ChatMessageRepository, CompleteDeliveryImageRepository, FailDeliveryImageRepository } from "./repository";

const FailDeliveryImageModel = mongoose.connection.model("failDeliveryImage", FailDeliveryImageSchema);
export const failDeliveryImageRepository = new FailDeliveryImageRepository(FailDeliveryImageModel);

const completeDeliveryImageModel = mongoose.connection.model("completeDeliverImage", CompleteDeliveryImageSchema);
export const completeDeliveryImageRepository = new CompleteDeliveryImageRepository(completeDeliveryImageModel);

const chatMessageModel = mongoose.connection.model("chatMessage", ChatMessageSchema);
export const chatMessageRepository = new ChatMessageRepository(chatMessageModel);
