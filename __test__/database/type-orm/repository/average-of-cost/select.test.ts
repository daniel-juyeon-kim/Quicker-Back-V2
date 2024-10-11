import { AverageOfCost, AverageOfCostRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const averageRepository = new AverageOfCostRepository(testAppDataSource.getRepository(AverageOfCost));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  const average1: AverageOfCost = {
    date: new Date(1990, 1, 1),
    "5KM": 5,
    "10KM": 10,
    "15KM": 15,
    "20KM": 20,
    "25KM": 25,
    "30KM": 30,
    "40KM": 40,
    "50KM": 50,
    "60KM": 60,
    "60+KM": 70,
  };

  const average2: AverageOfCost = {
    date: new Date(1993, 1, 1),
    "5KM": 329,
    "10KM": 4259,
    "15KM": 11923,
    "20KM": 23491,
    "25KM": 32489,
    "30KM": 32498,
    "40KM": 34982,
    "50KM": 34329,
    "60KM": 45903,
    "60+KM": 45098,
  };

  await testAppDataSource.manager.save(AverageOfCost, [average1, average2]);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(AverageOfCost);
});

describe("findLastMonthAverageCost 테스트", () => {
  test("통과하는 테스트", async () => {
    await expect(averageRepository.findLastMonthAverageCost("40KM")).resolves.toEqual({ "40KM": 34982 });
  });

  test("실패하는 테스트, 값이 존재하지 않음", async () => {
    await testAppDataSource.manager.clear(AverageOfCost);

    await expect(averageRepository.findLastMonthAverageCost("40KM")).rejects.toThrow("데이터를 찾지 못했습니다.");
  });
});
