import { createLastMonthRange } from "../../../cron/data/month";

const createDate = (year: number, month: number, date: number) => {
  const dateObj = new Date();

  dateObj.setFullYear(year, month, date);
  dateObj.setHours(0, 0, 0, 0);

  return dateObj;
};

describe("createLastMonthRange 테스트", () => {
  test("통과", () => {
    // 2024. 01. 01 0시 0분 0초
    const date = createDate(2024, 0, 1);

    // 작년 12월 올해 1월
    const { start, end } = createLastMonthRange(date);

    // 2023. 12. 01 0시 0분 0초
    const expectStartDate = createDate(2023, 11, 1);

    // 2024. 01. 01 0시 0분 0초
    const expectEndDate = createDate(2024, 0, 1);

    expect(start).toStrictEqual(expectStartDate);
    expect(end).toStrictEqual(expectEndDate);
  });
});
