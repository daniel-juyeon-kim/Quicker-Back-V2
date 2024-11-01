import mongoose from "mongoose";

import { CompleteDeliveryImageSchema, FailDeliveryImageSchema } from "./models";
import { CompleteDeliveryImageRepository, FailDeliveryImageRepository } from "./repository";

const FailDeliveryImageModel = mongoose.connection.model("failDeliveryImage", FailDeliveryImageSchema);
export const failDeliveryImageRepository = new FailDeliveryImageRepository(FailDeliveryImageModel);

const completeDeliveryImageModel = mongoose.connection.model("completeDeliverImage", CompleteDeliveryImageSchema);
export const completeDeliveryImageRepository = new CompleteDeliveryImageRepository(completeDeliveryImageModel);
