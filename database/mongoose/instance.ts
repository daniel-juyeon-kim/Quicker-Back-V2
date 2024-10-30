import mongoose from "mongoose";

import { FailDeliveryImageSchema } from "./models";
import { FailDeliveryImageRepository } from "./repository";

const FailDeliveryImageModel = mongoose.connection.model("failDeliveryImage", FailDeliveryImageSchema);

export const failDeliveryImageRepository = new FailDeliveryImageRepository(FailDeliveryImageModel);
