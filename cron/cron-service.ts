import { ErrorMessage, ErrorMessageBot } from "../service/slack";
import { DataService } from "./data/data-service";
import { TableService } from "./table";

export class CronService {
  constructor(
    private errorMessageBot: ErrorMessageBot,
    private data: DataService,
    private table: TableService,
  ) {}

  public async run() {
    try {
      const orderInfos = await this.data.findLastMonthOrderInfo(new Date());
      const table = this.table.createAverageTable(orderInfos);
      await this.data.saveAverageTable(table);
    } catch (e) {
      const errorMessage = new ErrorMessage(e as Error, new Date());
      this.errorMessageBot.sendMessage(errorMessage);
    }
  }
}
