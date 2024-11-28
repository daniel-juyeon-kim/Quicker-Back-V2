import { mock, mockClear } from "jest-mock-extended";
import { ErrorMessageBotErrorHandler } from "../../../../../controllers/error/external-api/handler/impl/error-message-bot-error.handler";
import { ErrorLogger, ErrorMessageBotError, TmapApiError } from "../../../../../core";

const logger = mock<ErrorLogger>();

const handler = new ErrorMessageBotErrorHandler(logger);

beforeEach(async () => {
  mockClear(logger);
});

describe("ErrorMessageBotErrorHandler", () => {
  describe("handle()", () => {
    test("통과하는 테스트", () => {
      const date = new Date(2000, 1, 1);
      const error = new ErrorMessageBotError("에러");

      handler.handle({ date, error });

      expect(logger.log).toHaveBeenCalledWith({ date, error });
    });

    test("실패하는 테스트, 해당 헨들러가 담당하지 않는 에러", () => {
      const date = new Date(2000, 1, 1);
      const error = new TmapApiError("에러");

      handler.handle({ date, error });

      expect(logger.log).not.toHaveBeenCalled();
    });
  });
});
