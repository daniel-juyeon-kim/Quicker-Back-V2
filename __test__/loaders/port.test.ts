import { Application } from "express";
import { port } from "../../loaders/port";

const app = {
  listen: jest.fn(),
} as unknown as Application;

describe("initalizePort 포트 유효성 검사 테스트", () => {
  test("통과", () => {
    expect(() => port.init(app, "3000")).not.toThrow();
  });

  test("실패하는 테스트", () => {
    const testCases = [
      { value: "", errorMessage: "[WARN] Invalid Env value, port is empty string" },
      { value: undefined, errorMessage: "[WARN] Invalid Env value, port is undefined" },
      { value: "test", errorMessage: "[WARN] Port must be a positive numeric string" },
      { value: "0", errorMessage: "[WARN] Port must be a positive numeric string" },
      { value: "-1", errorMessage: "[WARN] Port must be a positive numeric string" },
    ];

    testCases.forEach(({ value, errorMessage }) => {
      expect(() => port.init(app, value)).toThrow(errorMessage);
    });
  });
});
