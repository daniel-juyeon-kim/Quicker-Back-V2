import { LocationRepository } from "../../../database/type-orm/repository/location/location.repository";
import { OrderLocationService } from "./order-location.service";

export class OrderLocationServiceImpl implements OrderLocationService {
  constructor(private readonly repository: LocationRepository) {}

  async findDepartureAndDestination(orderId: number) {
    return await this.repository.findDestinationDepartureByOrderId(orderId);
  }
}
