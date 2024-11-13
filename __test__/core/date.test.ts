import { createLastMonth, createLastMonthRange } from "../../core/date";

describe("createLastMonthRange 테스트", () => {
  test("통과", () => {
    // 2024. 05. 01 0시 0분 0초
    const date = new Date(2024, 4, 1);

    // 2024. 04. 01 0시 0분 0초
    const start = new Date(2024, 3, 1);

    // 2024. 04. 30 23시 59분 59초 999
    const end = new Date(2024, 4, 0, 23, 59, 59, 999);

    expect(createLastMonthRange(date)).toEqual({ start, end });
  });

  test("통과, 생성된 날자가 작년인 테스트", () => {
    // 2024. 01. 01 0시 0분 0초
    const date = new Date(2024, 0, 1);

    // 2023. 12. 01 0시 0분 0초
    const start = new Date(2023, 11, 1);

    // 2024. 12. 31 23시 59분 59초 999
    const end = new Date(2024, 0, 0, 23, 59, 59, 999);

    // 작년 12월 올해 1월
    expect(createLastMonthRange(date)).toEqual({ start, end });
  });
});
describe("createLastMonth 테스트", () => {
  test("통과", () => {
    const date = new Date(1999, 1, 1);
    const expectDate = new Date(1999, 0);

    expect(createLastMonth(date)).toEqual(expectDate);
  });

  test("통과, 생성된 날자가 작년인 테스트", () => {
    const date = new Date(1999, 0, 1);
    const expectDate = new Date(1998, 11);

    expect(createLastMonth(date)).toEqual(expectDate);
  });
});
