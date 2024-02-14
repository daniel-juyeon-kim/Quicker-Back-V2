import { AverageModel } from "./average";
import { CacheOrderModel } from "./cache-order";
import { LocationModel } from "./location";
import { OrderModel } from "./order";
import { RoomModel } from "./room";
import { UserModel } from "./user";

const averageInstance = new AverageModel();
const cacheOrderInstance = new CacheOrderModel();
const locationInstance = new LocationModel();
const orderInstance = new OrderModel();
const roomInstance = new RoomModel();
const userInstance = new UserModel();

export {
    averageInstance,
    cacheOrderInstance,
    locationInstance,
    orderInstance,
    roomInstance,
    userInstance,
};