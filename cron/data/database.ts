import { AverageCostRepository, AverageOfCost, DeliveryPersonMatchedDateRepository } from "../../database";
import { LocationRepository } from "../../database/type-orm/repository/location/location.repository";

export class DB {
  private averageCostRepository: AverageCostRepository;
  private deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
  private locationRepository: LocationRepository;

  constructor({
    averageCostRepository,
    deliveryPersonMatchedDateRepository,
    locationRepository,
  }: {
    averageCostRepository: AverageCostRepository;
    deliveryPersonMatchedDateRepository: DeliveryPersonMatchedDateRepository;
    locationRepository: LocationRepository;
  }) {
    this.averageCostRepository = averageCostRepository;
    this.deliveryPersonMatchedDateRepository = deliveryPersonMatchedDateRepository;
    this.locationRepository = locationRepository;
  }

  public async saveAverageTable(averageTable: Omit<AverageOfCost, "date">) {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    return await this.averageCostRepository.createAverage(averageTable, date);
  }

  public async findAllLastMonthOrderId(startDate: Date, endDate: Date) {
    const orders = await this.deliveryPersonMatchedDateRepository.findAllOrderIdByBetweenDates(startDate, endDate);

    return orders.map((order) => order.id);
  }

  public async findAllDestinationDeparture(ids: number[]) {
    return await this.locationRepository.findAllDestinationDepartureByOrderId(ids);
  }
}
