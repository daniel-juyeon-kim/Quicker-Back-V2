import { Combiner } from "../../../cron/data/combiner";
import { DataService } from "../../../cron/data/data-service";
import { DB } from "../../../cron/data/database";
import { ExternalApi } from "../../../cron/data/external-api";

let database: DB;
let externalApi: ExternalApi;

beforeAll(() => {
  database = {
    saveAverage: jest.fn(),
    findLastMonthOrderIds: jest.fn().mockReturnValue([1, 2, 3]), //: Promise<number>
    findLocation: jest.fn().mockReturnValue([{}]), // :Promise<Location[]>
  } as unknown as DB;

  externalApi = {
    findPrice: jest.fn().mockReturnValue([
      { orderNumber: 1, price: 100000 },
      { orderNumber: 2, price: 200000 },
      { orderNumber: 3, price: 300000 },
    ]),
    findDistance: jest.fn().mockReturnValue([
      { orderId: 1, km: 30 },
      { orderId: 2, km: 50 },
      { orderId: 3, km: 60 },
    ]),
  } as unknown as ExternalApi;
});

test("", async () => {
  const dataService = new DataService(database, externalApi, new Combiner());

  const result = await dataService.findLastMonthOrderInfo(new Date());

  const expectResult = [
    { id: 1, km: 30, price: 100000 },
    { id: 2, km: 50, price: 200000 },
    { id: 3, km: 60, price: 300000 },
  ];
  expect(result).toStrictEqual(expectResult);
});
