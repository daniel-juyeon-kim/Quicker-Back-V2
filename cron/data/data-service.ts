import { createLastMonthRange } from "../../core/date";
import { Table } from "../types";
import { Combiner } from "./combiner";
import { DB } from "./database";
import { ExternalApi } from "./external-api";

export class DataService {
  private database: DB;
  private externalApi: ExternalApi;
  private combiner: Combiner;

  constructor({ database, externalApi, combiner }: { database: DB; externalApi: ExternalApi; combiner: Combiner }) {
    this.database = database;
    this.externalApi = externalApi;
    this.combiner = combiner;
  }

  public async findAllLastMonthOrderPriceAndDistance(date: Date) {
    const { start, end } = createLastMonthRange(date);

    const ids = await this.database.findAllLastMonthOrderId(start, end);

    const prices = await this.externalApi.findAllPriceByIds(ids);
    const locations = await this.database.findAllDestinationDeparture(ids);
    const distances = await this.externalApi.findAllDistance(locations);

    return this.combiner.combineById(prices, distances);
  }

  public async saveAverageTable(table: Table) {
    await this.database.saveAverageTable(table);
  }
}
