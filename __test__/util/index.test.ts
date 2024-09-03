import {
  isEmptyString,
  isEqual,
  isFulfilled,
  isNull,
  isNumber,
  isPositiveNumber,
  isString,
  isUndefined,
} from "../../util";

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

describe("isNumber 테스트", () => {
  test("통과", () => {
    const result = isNumber(1);

    expect(result).toBe(true);
  });

  test("실패", () => {
    [-Infinity, NaN, Infinity].forEach((value) => {
      const result = isNumber(value);

      expect(result).toBe(false);
    });
  });
});

describe("isPositiveNumber 테스트", () => {
  test("통과", () => {
    const result = isPositiveNumber(1);

    expect(result).toBe(true);
  });

  test("실패", () => {
    [0, NaN].forEach((value) => {
      const result = isPositiveNumber(value);

      expect(result).toBe(false);
    });
  });
});

describe("isString 테스트", () => {
  test("통과", () => {
    expect(isString("")).toBe(true);
  });

  test("실패", () => {
    [1, NaN, {}].forEach((value) => {
      const result = isString(value);

      expect(result).toBe(false);
    });
  });
});

describe("isEmptyString 테스트", () => {
  test("통과", () => {
    expect(isEmptyString("")).toBe(true);
  });

  test("실패", () => {
    ["asdf", "d"].forEach((value) => {
      const result = isEmptyString(value);

      expect(result).toBe(false);
    });
  });
});

describe("isFulfilled 테스트", () => {
  test("통과", () => {
    const actual = isFulfilled({ status: "fulfilled", value: "값" });

    expect(actual).toBe(true);
  });

  test("싪패", () => {
    const actual = isFulfilled({ status: "rejected", reason: "값" });

    expect(actual).toBe(false);
  });
});

describe("isNull 테스트", () => {
  test("통과", () => {
    expect(isNull(null)).toBe(true);
  });

  test("실패", () => {
    [undefined, 0, false, -1, {}].forEach((value) => {
      expect(isNull(value)).toBe(false);
    });
  });
});

describe("isEqual 테스트", () => {
  test("통과", () => {
    expect(isEqual(1, 1)).toBe(true);
  });

  test("실패", () => {
    [Infinity, NaN, -Infinity].forEach((value) => {
      expect(isEqual(value, 1)).toBe(false);
    });
  });
});
