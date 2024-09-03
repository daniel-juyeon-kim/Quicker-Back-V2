import { AverageCalculator } from "../../cron/average-calculator";
import { Distance, OrderInfo } from "../../cron/types";
import { createAverageTable } from "../../cron/util";

const averageCalculator = new AverageCalculator();

const createExpectAverageTable = (map: { key: Distance; value: number }[]) => {
  const averageTable = {
    date: "",
    "5KM": 0,
    "10KM": 0,
    "15KM": 0,
    "20KM": 0,
    "25KM": 0,
    "30KM": 0,
    "40KM": 0,
    "50KM": 0,
    "60KM": 0,
    "60+KM": 0,
  };

  map.forEach((element) => {
    averageTable[element.key] = element.value;
  });

  return averageTable;
};

describe("average-calculator 테스트", () => {
  test("일반적", () => {
    const orderInfos: OrderInfo[] = [
      { orderId: 1, km: 20, price: 10000 },
      { orderId: 5, km: 30, price: 39200 },
      { orderId: 143, km: 45, price: 40230 },
    ];

    const averageTable = averageCalculator.calculateAverage(orderInfos);

    const expectResult = createExpectAverageTable([
      { key: "20KM", value: 10000 },
      { key: "30KM", value: 39200 },
      { key: "50KM", value: 40230 },
    ]);

    expect(averageTable).toStrictEqual(expectResult);
  });

  test("소수점 내림 처리", () => {
    const orderInfos: OrderInfo[] = [
      { orderId: 1, km: 20, price: 10000 },
      { orderId: 5, km: 30, price: 39200 },
      { orderId: 9, km: 20, price: 48215 },
      { orderId: 143, km: 45, price: 40230 },
    ];

    const averageTable = averageCalculator.calculateAverage(orderInfos);

    const expectResult = createExpectAverageTable([
      { key: "20KM", value: 29107 },
      { key: "30KM", value: 39200 },
      { key: "50KM", value: 40230 },
    ]);

    expect(averageTable).toStrictEqual(expectResult);
  });

  test("기본값 0 확인", () => {
    const orderInfos: OrderInfo[] = [];

    const averageTable = averageCalculator.calculateAverage(orderInfos);

    const expectResult = createAverageTable();

    expect(averageTable).toStrictEqual(expectResult);
  });
});
