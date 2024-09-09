import { CronService } from "../../cron/cron-service";
import { DataService } from "../../cron/data/data-service";
import { TableService } from "../../cron/table";
import { ErrorMessageBot } from "../../service/slack";

let errorMessageBot: jest.Mocked<ErrorMessageBot>;
let dataService: jest.Mocked<DataService>;
const tableService = { createAverageTable: jest.fn() } as unknown as jest.Mocked<TableService>;
let cronService: CronService;

beforeEach(() => {
  dataService = {
    findLastMonthOrderInfo: jest.fn().mockResolvedValue([
      { id: 1, km: 30, price: 100000 },
      { id: 2, km: 50, price: 200000 },
      { id: 3, km: 60, price: 300000 },
    ]),
    saveAverageTable: jest.fn(),
  } as unknown as jest.Mocked<DataService>;

  errorMessageBot = {
    sendMessage: jest.fn(),
  };

  cronService = new CronService({ errorMessageBot, dataService, tableService });
});

describe("", () => {
  test("정상 흐름", async () => {
    await cronService.run();

    expect(errorMessageBot.sendMessage).not.toHaveBeenCalled();
    expect(dataService.saveAverageTable).toHaveBeenCalled();
  });

  test("내부 로직에 에러가 발생함", async () => {
    dataService.findLastMonthOrderInfo = jest.fn((date: Date) => {
      throw new Error();
    });

    await cronService.run();

    expect(errorMessageBot.sendMessage).toHaveBeenCalled();
    expect(dataService.saveAverageTable).not.toHaveBeenCalled();
  });
});
