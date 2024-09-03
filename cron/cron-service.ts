import { AverageOfCostAttributes } from "../maria/models/AverageOfCost";
import { ErrorMessage, ErrorMessageBot } from "../service/slack";
import { isEqual, isNull, isUndefined } from "../util";
import { AverageCalculator } from "./average-calculator";
import { DB } from "./data/db";
import { ExternalApi } from "./data/external-api";
import { createLastMonthRange } from "./util";

export class CronService {
  constructor(
    private slackBot: ErrorMessageBot,
    private externalApi: ExternalApi,
    private db: DB,
    private averageCalculator: AverageCalculator,
  ) {}

  public async run() {
    try {
      const { startDate, endDate } = createLastMonthRange(new Date());
      const orderInfos = await this.getOrderInfo(startDate, endDate);
      const averageTable = this.averageCalculator.calculateAverage(orderInfos);
      this.assignDateInAverageTable(averageTable, new Date());

      await this.db.saveAverage(averageTable);
    } catch (e) {
      const errorMessage = new ErrorMessage(e as Error, new Date());
      this.slackBot.sendMessage(errorMessage);
    }
  }

  private async getOrderInfo(startDate: Date, endDate: Date) {
    const ids = await this.db.findLastMonthOrderIds(startDate, endDate);
    const prices = await this.externalApi.findPrice(ids);
    const distances = await this.externalApi.findDistance(ids);

    return distances
      .map((distance) => {
        const price = prices.find(({ orderNumber }) => isEqual(orderNumber, distance.orderId));
        return isUndefined(price) ? null : { ...distance, price: price.price };
      })
      .filter((value) => !isNull(value));
  }

  private assignDateInAverageTable(averageTable: AverageOfCostAttributes, date: Date) {
    averageTable["date"] = date.toISOString();
  }
}
