import { isDevelopment, isUndefined } from "../../util";

describe("isUndefined 테스트", () => {
  test("통과", () => {
    const result = isUndefined(undefined);

    expect(result).toBe(true);
  });

  test("실패", () => {
    ["", "env", 3].forEach((value) => {
      const result = isUndefined(value);

      expect(result).toBe(false);
    });
  });
});

describe("isDevelopment 테스트", () => {
  test("통과", () => {
    const result = isDevelopment("production");

    expect(result).toBe(false);
  });

  test("실패", () => {
    ["production", undefined].forEach((value) => {
      const result = isDevelopment(value);

      expect(result).toBe(false);
    });
  });
});
