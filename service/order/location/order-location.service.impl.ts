import { LocationRepository } from "../../../database";
import { OrderLocationService } from "./order-location.service";

export class OrderLocationServiceImpl implements OrderLocationService {
  constructor(private readonly repository: LocationRepository) {}

  async findDepartureAndDestination(
    stringTypeOrderId: Parameters<OrderLocationService["findDepartureAndDestination"]>[0],
  ) {
    const orderId = parseInt(stringTypeOrderId);

    return await this.repository.findDestinationDepartureByOrderId(orderId);
  }
}
