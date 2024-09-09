import { AverageOfCostAttributes } from "../../maria/models/AverageOfCost";
import { Combiner } from "./combiner";
import { DB } from "./database";
import { ExternalApi } from "./external-api";
import { createLastMonthRange } from "./month";

export class DataService {
  private database: DB;
  private externalApi: ExternalApi;
  private combiner: Combiner;

  constructor({ database, externalApi, combiner }: Dependency) {
    this.database = database;
    this.externalApi = externalApi;
    this.combiner = combiner;
  }

  public async findLastMonthOrderInfo(date: Date) {
    const { start, end } = createLastMonthRange(date);

    const ids = await this.database.findLastMonthOrderIds(start, end);

    const prices = await this.externalApi.findPrice(ids);
    const locations = await this.database.findLocation(ids);
    const distances = await this.externalApi.findDistance(locations);

    return this.combiner.combineById(prices, distances);
  }

  public async saveAverageTable(table: AverageOfCostAttributes) {
    await this.database.saveAverage(table);
  }
}

type Dependency = {
  database: DB;
  externalApi: ExternalApi;
  combiner: Combiner;
};
