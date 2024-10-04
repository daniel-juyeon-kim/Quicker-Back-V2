import { DataSource, In } from "typeorm";
import { Order } from "../../entity/order.entity";
import { AbstractRepository } from "../abstract-repository";

export class LocationRepository extends AbstractRepository<Order> {
  constructor(dataSource: DataSource) {
    super(dataSource, Order);
  }

  async findDestinationDepartureByOrderId(orderId: number) {
    const destinationDeparture = await this.repository.findOne({
      where: { id: orderId },
      relations: { departure: true, destination: true },
      select: {
        id: true,
        departure: { x: true, y: true },
        destination: { x: true, y: true },
      },
    });

    this.validateNull(destinationDeparture);

    return destinationDeparture;
  }

  async findAllDestinationDepartureByOrderId(orderIds: number[]) {
    const orderLocations = await this.repository.find({
      where: { id: In(orderIds) },
      relations: { departure: true, destination: true },
      select: {
        id: true,
        departure: { x: true, y: true },
        destination: { x: true, y: true },
      },
    });

    this.validateNull(orderLocations);

    return orderLocations;
  }
}
