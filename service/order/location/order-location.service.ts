import { LocationRepository } from "../../../database/type-orm/repository/location/location.repository";

export interface OrderLocationService {
  findDepartureAndDestination(orderId: number): ReturnType<LocationRepository["findDestinationDepartureByOrderId"]>;
}
