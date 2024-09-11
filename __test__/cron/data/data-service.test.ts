import { Combiner } from "../../../cron/data/combiner";
import { DataService } from "../../../cron/data/data-service";
import { DB } from "../../../cron/data/database";
import { ExternalApi } from "../../../cron/data/external-api";

const database = {
  findLastMonthOrderIds: jest.fn().mockReturnValue([]),
  findLocation: jest.fn().mockReturnValue([]),
} as unknown as jest.Mocked<DB>;
const externalApi = {} as unknown as jest.Mocked<ExternalApi>;
const combiner = new Combiner();

describe("combiner combineById 테스트", () => {
  test("정상적인 데이터를 받고 계산하는 테스트", async () => {
    externalApi.findPrice = jest.fn().mockReturnValue([
      { orderNumber: 1, price: 100000 },
      { orderNumber: 2, price: 200000 },
      { orderNumber: 3, price: 300000 },
    ]);
    externalApi.findDistance = jest.fn().mockReturnValue([
      { orderId: 1, km: 30 },
      { orderId: 2, km: 50 },
      { orderId: 3, km: 60 },
    ]);
    const expectResult = [
      { id: 1, km: 30, price: 100000 },
      { id: 2, km: 50, price: 200000 },
      { id: 3, km: 60, price: 300000 },
    ];

    const dataService = new DataService({ database, externalApi, combiner });

    const result = await dataService.findLastMonthOrderInfo(new Date());

    expect(result).toStrictEqual(expectResult);
  });

  test("누락된 데이터를 받고 계산하는 테스트", async () => {
    externalApi.findPrice = jest.fn().mockReturnValue([
      { orderNumber: 2, price: 200000 },
      { orderNumber: 3, price: 300000 },
      { orderNumber: 4, price: 500000 },
    ]);
    externalApi.findDistance = jest.fn().mockReturnValue([
      { orderId: 1, km: 30 },
      { orderId: 2, km: 50 },
      { orderId: 3, km: 60 },
    ]);
    const expectResult = [
      { id: 2, km: 50, price: 200000 },
      { id: 3, km: 60, price: 300000 },
    ];

    const dataService = new DataService({ database, externalApi, combiner });

    const result = await dataService.findLastMonthOrderInfo(new Date());

    expect(result).toStrictEqual(expectResult);
  });
});
