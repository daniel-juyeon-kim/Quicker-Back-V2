import { Application } from "express";
import initializePort from "../../loaders/port";

const app = {
  listen: jest.fn(),
} as unknown as Application;

describe("initalizePort 포트 유효성 검사 테스트", () => {
  test("통과", () => {
    expect(() => {
      initializePort(app, "3000");
    }).not.toThrow();
  });

  test("실패", () => {
    const failureTestCases = [
      { value: "", errorMessage: "[WARN] Invalid Env value, port is empty string" },
      { value: undefined, errorMessage: "[WARN] Invalid Env value, port is undefined" },
      { value: "test", errorMessage: "[WARN] Port must be a numeric string" },
    ];

    failureTestCases.forEach(({ value, errorMessage }) => {
      expect(() => {
        initializePort(app, value);
      }).toThrow(errorMessage);
    });
  });
});
