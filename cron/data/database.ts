import { AverageModel } from "../../maria/commands/average";
import { CacheOrderModel } from "../../maria/commands/cache-order";
import { LocationModel } from "../../maria/commands/location";
import sequelizeConnector from "../../maria/connector/sequelize-connector";
import { AverageOfCostAttributes, initModels } from "../../maria/models/init-models";

initModels(sequelizeConnector);

export class DB {
  constructor(
    private averageInstance: AverageModel,
    private cacheOrderInstance: CacheOrderModel,
    private locationInstance: LocationModel,
  ) {}

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
