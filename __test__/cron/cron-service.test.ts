import { ErrorMessageBot } from "../../core";
import { CronService } from "../../cron/cron-service";
import { DataService } from "../../cron/data/data-service";
import { TableService } from "../../cron/table";

const errorMessageBot: jest.Mocked<ErrorMessageBot> = {
  sendMessage: jest.fn(),
};
const dataService = {
  findLastMonthOrderInfo: jest.fn(),
  saveAverageTable: jest.fn(),
} as unknown as jest.Mocked<DataService>;
const tableService = {
  createAverageTable: jest.fn(),
} as unknown as jest.Mocked<TableService>;
let cronService: CronService;

beforeEach(() => {
  dataService.findLastMonthOrderInfo = jest.fn();
  cronService = new CronService({ errorMessageBot, dataService, tableService });
});

describe("cronService 테스트", () => {
  test("통과하는 테스트", async () => {
    await cronService.run();

    expect(errorMessageBot.sendMessage).not.toHaveBeenCalled();
    expect(dataService.saveAverageTable).toHaveBeenCalled();
  });

  test("에러 발생 처리 테스트", async () => {
    dataService.findLastMonthOrderInfo = jest.fn((date: Date) => {
      throw new Error();
    });

    await cronService.run();

    expect(errorMessageBot.sendMessage).toHaveBeenCalled();
    expect(dataService.saveAverageTable).not.toHaveBeenCalled();
  });
});
