import { parseToNumberList } from "../../service/parser";

describe("객체의 속성중 null이 있는지 확인하는 테스트", () => {

  test("성공", () => {
    expect(parseToNumberList('1,2,3,4')).toEqual([1,2,3,4])
  });

  test("실패", () => {
    expect(() => parseToNumberList('1,d,3,4')).toThrow("숫자가 아닌 요소가 포함되어 있습니다.")
  });
});
