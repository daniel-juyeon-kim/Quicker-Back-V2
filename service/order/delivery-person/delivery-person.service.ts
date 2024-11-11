import { CurrentDeliveryLocationRepository } from "../../../database";

export class DeliveryPersonService {
  constructor(private readonly repository: CurrentDeliveryLocationRepository) {}

  async findCurrentLocation(orderId: string) {
    return await this.repository.findCurrentLocationByOrderId(parseInt(orderId));
  }
}
