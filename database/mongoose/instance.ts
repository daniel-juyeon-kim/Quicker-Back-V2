import mongoose from "mongoose";

import {
  ChatMessageSchema,
  CompleteDeliveryImageSchema,
  CurrentDeliveryLocationSchema,
  FailDeliveryImageSchema,
} from "./models";
import {
  ChatMessageRepository,
  CompleteDeliveryImageRepository,
  CurrentDeliveryLocationRepository,
  FailDeliveryImageRepository,
} from "./repository";

const FailDeliveryImageModel = mongoose.connection.model("failDeliveryImage", FailDeliveryImageSchema);
export const failDeliveryImageRepository = new FailDeliveryImageRepository(FailDeliveryImageModel);

const completeDeliveryImageModel = mongoose.connection.model("completeDeliverImage", CompleteDeliveryImageSchema);
export const completeDeliveryImageRepository = new CompleteDeliveryImageRepository(completeDeliveryImageModel);

const chatMessageModel = mongoose.connection.model("chatMessage", ChatMessageSchema);
export const chatMessageRepository = new ChatMessageRepository(chatMessageModel);

const deliveryLocationModel = mongoose.connection.model("deliveryLocation", CurrentDeliveryLocationSchema);
export const currentDeliverLocationRepository = new CurrentDeliveryLocationRepository(deliveryLocationModel);
