import { ProductionEnvChecker } from "../../../util/env-checker";

describe("productionEnvChecker 테스트", () => {
  const productionEnvChecker = new ProductionEnvChecker();

  test("통과", () => {
    ["value", { a: "d", b: "c" }, { a: { b: "c", d: "e" }, f: { g: "h", i: "i", j: "k" }, l: "m" }].forEach((value) => {
      expect(() => {
        productionEnvChecker.checkEnv("key", value);
      }).not.toThrow();
    });
  });

  test("실패", () => {
    const testValues = [
      { value: undefined, errorMessage: "[WARN] key is undefined" },
      { value: "", errorMessage: "[WARN] key is empty string" },
    ];

    testValues.forEach(({ value, errorMessage }) => {
      expect(() => {
        productionEnvChecker.checkEnv("key", value);
      }).toThrow(errorMessage);
    });
  });
});
