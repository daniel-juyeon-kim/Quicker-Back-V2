import { initializeDataSource, testAppDataSource } from "../data-source";

describe("initializeDataSource 테스트 코드", () => {
  test("DataSource 초기화 실행 안함", async () => {
    expect(testAppDataSource.isInitialized).toEqual(false);
  });

  test("DataSource 초기화 실행", async () => {
    await initializeDataSource(testAppDataSource);

    expect(testAppDataSource.isInitialized).toEqual(true);
  });
});
