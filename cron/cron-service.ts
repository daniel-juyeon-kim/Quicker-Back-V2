import { ErrorMessage, ErrorMessageBot } from "../core";
import { DataService } from "./data/data-service";
import { TableService } from "./table";

export class CronService {
  private errorMessageBot: ErrorMessageBot;
  private dataService: DataService;
  private tableService: TableService;

  constructor({
    errorMessageBot,
    dataService,
    tableService,
  }: {
    errorMessageBot: ErrorMessageBot;
    dataService: DataService;
    tableService: TableService;
  }) {
    this.errorMessageBot = errorMessageBot;
    this.dataService = dataService;
    this.tableService = tableService;
  }

  public async run() {
    try {
      const orders = await this.dataService.findAllLastMonthOrderPriceAndDistance(new Date());
      const averageTable = this.tableService.createAverageTable(orders);
      await this.dataService.saveAverageTable(averageTable);
    } catch (e) {
      const errorMessage = new ErrorMessage({ error: e as Error, date: new Date() });
      this.errorMessageBot.sendMessage(errorMessage);
    }
  }
}
