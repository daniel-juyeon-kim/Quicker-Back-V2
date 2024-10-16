import { mock } from "jest-mock-extended";
import { Logger } from "winston";
import { ErrorFileLogger } from "../../core/error-file-logger/error-file-logger";

const winstonLogger = mock<Logger>();

const logger = new ErrorFileLogger(winstonLogger);

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

describe("ErrorFileLogger 테스트", () => {
  test("log 테스트", () => {
    const error = new Error();
    const level = "error";

    logger.log({ error, date: fakeDate });

    expect(winstonLogger.log).toHaveBeenCalledWith(level, fakeDate.toLocaleString(), error);
  });
});
