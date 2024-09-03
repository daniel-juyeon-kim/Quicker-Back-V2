import { createLastMonthRange } from "../../cron/util";

describe("createLastMonthRange 테스트", () => {
  test("통과", () => {
    // 2024. 01. 01 0시 0분 0초
    const date = new Date();
    date.setFullYear(2024, 0, 1);
    date.setHours(0, 0, 0, 0);

    // 작년 12월 올해 1월
    const { startDate, endDate } = createLastMonthRange(date);

    // 2023. 12. 01 0시 0분 0초
    const expectStartDate = new Date();
    expectStartDate.setFullYear(2023, 11, 1);
    expectStartDate.setHours(0, 0, 0, 0);

    // 2024. 01. 01 0시 0분 0초
    const expectEndDate = new Date();
    expectEndDate.setFullYear(2024, 0, 1);
    expectEndDate.setHours(0, 0, 0, 0);

    expect(startDate).toStrictEqual(expectStartDate);
    expect(endDate).toStrictEqual(expectEndDate);
  });
});

describe("createAverageTable 테스트", () => {
  test("통과", () => {});
});
