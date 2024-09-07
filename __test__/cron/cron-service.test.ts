import { CronService } from "../../cron/cron-service";
import { DataService } from "../../cron/data/data-service";
import { TableService } from "../../cron/table";
import { ErrorMessageBot } from "../../service/slack";

let errorBot: jest.Mocked<ErrorMessageBot>;
let data: jest.Mocked<DataService>;
const table = { createAverageTable: jest.fn() } as unknown as jest.Mocked<TableService>;
let cronService: CronService;

beforeEach(() => {
  data = {
    findLastMonthOrderInfo: jest.fn().mockResolvedValue([
      { id: 1, km: 30, price: 100000 },
      { id: 2, km: 50, price: 200000 },
      { id: 3, km: 60, price: 300000 },
    ]),
    saveAverageTable: jest.fn(),
  } as unknown as jest.Mocked<DataService>;

  errorBot = {
    sendMessage: jest.fn(),
  };

  cronService = new CronService(errorBot, data, table);
});

describe("", () => {
  test("정상 흐름", async () => {
    await cronService.run();

    expect(errorBot.sendMessage).not.toHaveBeenCalled();
    expect(data.saveAverageTable).toHaveBeenCalled();
  });

  test("내부 로직에 에러가 발생함", async () => {
    data.findLastMonthOrderInfo = jest.fn((date: Date) => {
      throw new Error();
    });

    await cronService.run();

    expect(errorBot.sendMessage).toHaveBeenCalled();
    expect(data.saveAverageTable).not.toHaveBeenCalled();
  });
});
