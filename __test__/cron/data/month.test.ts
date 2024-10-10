import { createLastMonthRange } from "../../../cron/data/month";

describe("createLastMonthRange 테스트", () => {
  test("통과, 연도가 바뀌는 경우", () => {
    // 2024. 01. 01 0시 0분 0초
    const date = new Date(2024, 0, 1, 0, 0, 0, 0);

    // 2023. 12. 01 0시 0분 0초
    const start = new Date(2023, 11, 1, 0, 0, 0, 0);

    // 2024. 12. 31 23시 59분 59초 999
    const end = new Date(2024, 0, 0, 23, 59, 59, 999);

    // 작년 12월 올해 1월
    expect(createLastMonthRange(date)).toEqual({ start, end });
  });

  test("통과", () => {
    // 2024. 05. 01 0시 0분 0초
    const date = new Date(2024, 4, 1, 0, 0, 0, 0);

    // 2024. 04. 01 0시 0분 0초
    const start = new Date(2024, 3, 1, 0, 0, 0, 0);

    // 2024. 04. 30 23시 59분 59초 999
    const end = new Date(2024, 4, 0, 23, 59, 59, 999);

    expect(createLastMonthRange(date)).toEqual({ start, end });
  });
});
