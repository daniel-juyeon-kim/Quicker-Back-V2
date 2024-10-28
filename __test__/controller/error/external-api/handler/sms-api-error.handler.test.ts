import { mock, mockClear } from "jest-mock-extended";

import { SmsApiErrorHandler } from "../../../../../controllers/error/external-api/handler";
import { ErrorLogger, ErrorMessageBot, SmsApiError, TmapApiError } from "../../../../../core";

const logger = mock<ErrorLogger>();
const errorMessageBot = mock<ErrorMessageBot>();

const handler = new SmsApiErrorHandler({
  logger,
  errorMessageBot,
});

beforeEach(async () => {
  mockClear(logger);
  mockClear(errorMessageBot);
});

describe("SmsApiErrorHandler", () => {
  describe("handle()", () => {
    test("통과하는 테스트", async () => {
      const date = new Date(2000, 1, 1);
      const error = new SmsApiError("에러");

      await handler.handle({ date, error });

      expect(logger.log).toHaveBeenCalledWith({ date, error });
    });

    test("실패하는 테스트, 해당 헨들러가 담당하지 않는 에러", async () => {
      const date = new Date(2000, 1, 1);
      const error = new TmapApiError("에러");

      await handler.handle({ date, error });

      expect(logger.log).not.toHaveBeenCalled();
    });
  });
});
