import { isAttributeNull } from "../../service/checker";

describe("객체의 속성중 null이 있는지 확인하는 테스트", () => {
  
  const testCases = [
    {
      actual: {
        id: "!",
        name: null,
        age: 3,
      },
      result: true,
    },
    {
      actual: {
        id: "!",
        name: "dan",
        age: 3,
      },
      result: false,
    },
  ];

  test("성공", () => {
    testCases.forEach(({actual, result}) => {
      expect(isAttributeNull(actual)).toEqual(result);
    })
  });

  test("실패", () => {
    testCases.forEach(({actual, result}) => {
      expect(isAttributeNull(actual)).not.toEqual(!result);
    })
  });
});
