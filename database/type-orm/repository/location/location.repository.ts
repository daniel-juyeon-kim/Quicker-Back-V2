export interface LocationRepository {
  findDestinationDepartureByOrderId(
    orderId: number,
  ): Promise<{ id: number; departure: { x: number; y: number }; destination: { x: number; y: number } }>;
}