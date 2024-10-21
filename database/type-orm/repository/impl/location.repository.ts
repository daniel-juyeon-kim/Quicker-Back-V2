import { In, Repository } from "typeorm";
import { Order } from "../../entity/order.entity";
import { AbstractRepository } from "../abstract-repository";

export class LocationRepository extends AbstractRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
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

    this.validateNotNull(destinationDeparture);

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

    this.validateNotNull(orderLocations);

    return orderLocations;
  }
}
