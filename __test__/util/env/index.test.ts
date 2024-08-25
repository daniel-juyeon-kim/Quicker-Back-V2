import { isDevelopment, isEnvType, isValidEnv } from "../../../util/env";

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

describe("isValidEnv 테스트", () => {
  test("통과", () => {
    ["d", "df"].forEach((value) => {
      const result = isValidEnv(value);

      expect(result).toBe(true);
    });
  });

  test("실패", () => {
    [undefined, ""].forEach((value) => {
      const result = isValidEnv(value);

      expect(result).toBe(false);
    });
  });
});

describe("isEnvType 테스트", () => {
  test("통과", () => {
    [undefined, "", "dsfds"].forEach((value) => {
      const result = isEnvType(value);

      expect(result).toBe(true);
    });
  });

  test("실패", () => {
    [1, null, {}].forEach((value) => {
      const result = isEnvType(value);

      expect(result).toBe(false);
    });
  });
});
