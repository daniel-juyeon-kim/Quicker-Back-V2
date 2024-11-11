import { CurrentDeliveryLocationRepository } from "../../../database";

export class DeliveryPersonService {
  constructor(private readonly repository: CurrentDeliveryLocationRepository) {}

  async findCurrentLocation(orderId: string) {
    return await this.repository.findCurrentLocationByOrderId(parseInt(orderId));
  }

  async createDeliveryPersonCurrentLocation({ orderId, x, y }: { x: number; y: number; orderId: number }) {
    await this.repository.saveDeliveryPersonLocation(orderId, { x, y });
  }
}
