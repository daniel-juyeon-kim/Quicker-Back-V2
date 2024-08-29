import { isDevelopment, isEnvType, isValidEnv, validateEnv, validateEnvValue } from "../../../util/env";

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

describe("validateEnv 테스트", () => {
  test("통과", () => {
    const target = {
      user: "user",
      password: "password",
    } as const;

    expect(() => {
      validateEnv(target);
    }).not.toThrow();
  });

  test("실패", () => {
    const target = {
      user: undefined,
      password: "password",
    };

    expect(() => {
      validateEnv(target);
    }).toThrow("[WARN] Invalid Env value, user is undefined");
  });

  test("실패", () => {
    const target = {
      user: "user",
      password: "",
    };

    expect(() => {
      validateEnv(target);
    }).toThrow("[WARN] Invalid Env value, password is empty string");
  });
});

describe("validateEnvValue 테스트", () => {
  test("통과", () => {
    expect(() => {
      validateEnvValue("user", "user");
    }).not.toThrow();
  });

  test("실패", () => {
    expect(() => {
      validateEnvValue("user", undefined);
    }).toThrow("[WARN] Invalid Env value, user is undefined");
  });

  test("실패", () => {
    expect(() => {
      validateEnvValue("password", "");
    }).toThrow("[WARN] Invalid Env value, password is empty string");
  });
});
