import { AverageCalculator } from "../../cron/average-calculator";
import { CronService } from "../../cron/cron-service";
import { DB } from "../../cron/data/db";
import { ExternalApi } from "../../cron/data/external-api";
import { ErrorMessageBot } from "../../service/slack";

const averageCalculator = new AverageCalculator();

let cronService: CronService;
let mockSlackBot: jest.Mocked<ErrorMessageBot>;
let mockExternalApi: jest.Mocked<ExternalApi>;
let mockDB: jest.Mocked<DB>;

beforeEach(() => {
  mockSlackBot = {
    sendMessage: jest.fn(),
  };

  mockExternalApi = {
    findPrice: jest.fn(),
    findDistance: jest.fn(),
  } as unknown as jest.Mocked<ExternalApi>;

  mockDB = {
    saveAverage: jest.fn(),
    findLocation: jest.fn(),
    findLastMonthOrderIds: jest.fn(),
  } as unknown as jest.Mocked<DB>;

  cronService = new CronService(mockSlackBot, mockExternalApi, mockDB, averageCalculator);
});

describe("cronService 테스트", () => {
  test("정상동작", async () => {
    mockDB.findLastMonthOrderIds.mockResolvedValue([1, 2]);

    mockExternalApi.findPrice.mockResolvedValue([
      { orderNumber: 1, price: 100 },
      { orderNumber: 2, price: 200 },
    ]);

    mockExternalApi.findDistance.mockResolvedValue([
      { orderId: 1, km: 10 },
      { orderId: 2, km: 20 },
    ]);

    await cronService.run();

    expect(mockDB.saveAverage).toHaveBeenCalled();
    expect(mockSlackBot.sendMessage).not.toHaveBeenCalled();
  });

  test("실패", async () => {
    const error = new Error("DB 에러 발생");

    mockDB.findLastMonthOrderIds.mockRejectedValue(error);

    await cronService.run();

    expect(mockSlackBot.sendMessage).toHaveBeenCalledTimes(1);
    expect(mockDB.saveAverage).not.toHaveBeenCalled();
  });
});
