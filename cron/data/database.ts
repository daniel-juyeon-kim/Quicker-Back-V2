import { AverageModel } from "../../maria/commands/average";
import { CacheOrderModel } from "../../maria/commands/cache-order";
import { LocationModel } from "../../maria/commands/location";
import sequelizeConnector from "../../maria/connector/sequelize-connector";
import { AverageOfCostAttributes, initModels } from "../../maria/models/init-models";

initModels(sequelizeConnector);

export class DB {
  private averageInstance: AverageModel;
  private cacheOrderInstance: CacheOrderModel;
  private locationInstance: LocationModel;

  constructor({ averageInstance, cacheOrderInstance, locationInstance }: Dependency) {
    this.averageInstance = averageInstance;
    this.cacheOrderInstance = cacheOrderInstance;
    this.locationInstance = locationInstance;
  }

  public async saveAverage(averageTable: AverageOfCostAttributes) {
    await this.averageInstance.create(averageTable);
  }

  public findLastMonthOrderIds(startDate: Date, endDate: Date) {
    return this.cacheOrderInstance.findAllId(startDate, endDate);
  }

  public findLocation(ids: number[]) {
    return this.locationInstance.findAll(ids);
  }
}

type Dependency = {
  averageInstance: AverageModel;
  cacheOrderInstance: CacheOrderModel;
  locationInstance: LocationModel;
};
