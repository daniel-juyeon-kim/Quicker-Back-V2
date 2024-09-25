import { initializeDataSource } from "../../../../../database/type-orm";
import { AverageOfCost } from "../../../../../database/type-orm/entity/average-of-cost.entity";
import { AverageOfCostRepository } from "../../../../../database/type-orm/repository/impl/average-of-cost.repository";
import { testAppDataSource } from "../data-source";

const averageRepository = new AverageOfCostRepository(testAppDataSource);

const createDate = new Date(1990, 1, 1).toISOString();
const average: AverageOfCost = {
  date: createDate,
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

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

beforeEach(async () => {
  await testAppDataSource.manager.save(AverageOfCost, average);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(AverageOfCost);
});

describe("findLastMonthAverageCost 테스트", () => {
  test("정상 흐름", async () => {
    await expect(averageRepository.findLastMonthAverageCost("40KM")).resolves.toEqual({ "40KM": 40 });
  });
});
