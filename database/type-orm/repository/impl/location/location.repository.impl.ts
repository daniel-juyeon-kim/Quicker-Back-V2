import { In, Repository } from "typeorm";

import { AbstractRepository } from "../..";
import { UnknownDataBaseError } from "../../../../../core";
import { Order } from "../../../entity";
import { NotExistDataError } from "../../../util";
import { LocationRepository } from "./location.repository";

export class LocationRepositoryImpl extends AbstractRepository implements LocationRepository {
  constructor(private readonly repository: Repository<Order>) {
    super();
  }

  async findDestinationDepartureByOrderId(orderId: number) {
    try {
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
    } catch (error) {
      if (error instanceof NotExistDataError) {
        throw new NotExistDataError(`${orderId}에 대한 주소 정보가 존재하지 않습니다.`);
      }
      throw new UnknownDataBaseError(error);
    }
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
