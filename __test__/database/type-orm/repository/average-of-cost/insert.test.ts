import { AverageOfCost, AverageOfCostRepository } from "../../../../../database/type-orm";
import { initializeDataSource, testAppDataSource } from "../data-source";

const averageRepository = new AverageOfCostRepository(testAppDataSource.getRepository(AverageOfCost));

beforeAll(async () => {
  await initializeDataSource(testAppDataSource);
});

afterEach(async () => {
  await testAppDataSource.manager.clear(AverageOfCost);
});

describe("createAverage 테스트", () => {
  test("통과하는 테스트", async () => {
    const createDate = new Date(1990, 0, 1, 0, 0, 0, 0);
    const average = {
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

    await averageRepository.createAverage(average);

    await expect(testAppDataSource.manager.existsBy(AverageOfCost, { date: createDate })).resolves.toBe(true);
  });
});
