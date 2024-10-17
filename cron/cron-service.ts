import { ErrorMessage, ErrorMessageBot } from "../core/slack";
import { DataService } from "./data/data-service";
import { TableService } from "./table";

export class CronService {
  private errorMessageBot: ErrorMessageBot;
  private dataService: DataService;
  private tableService: TableService;

  constructor({ errorMessageBot, dataService, tableService }: Dependency) {
    this.errorMessageBot = errorMessageBot;
    this.dataService = dataService;
    this.tableService = tableService;
  }

  public async run() {
    try {
      const orderInfos = await this.dataService.findLastMonthOrderInfo(new Date());
      const table = this.tableService.createAverageTable(orderInfos);
      await this.dataService.saveAverageTable(table);
    } catch (e) {
      const errorMessage = new ErrorMessage({ error: e as Error, date: new Date() });
      this.errorMessageBot.sendMessage(errorMessage);
    }
  }
}
type Dependency = {
  errorMessageBot: ErrorMessageBot;
  dataService: DataService;
  tableService: TableService;
};
