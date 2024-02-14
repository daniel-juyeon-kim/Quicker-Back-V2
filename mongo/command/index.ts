import { ImageModel } from "./image";
import { CurrentLocationModel } from "./location";
import { MessageModel } from "./message";

const imageInstance = new ImageModel();
const currentLocationInstance = new CurrentLocationModel();
const messageInstance = new MessageModel();

export { imageInstance, currentLocationInstance, messageInstance };
