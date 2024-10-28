import { Response } from "express";
import { mock, mockClear } from "jest-mock-extended";
import { ErrorMessageBotErrorHandler, SmsApiErrorHandler, TmapApiErrorHandler } from "../../../../controllers";
import { ExternalApiErrorController } from "../../../../controllers/error/external-api/external-api-error.controller";
import { ErrorLogger, ErrorMessageBot, ErrorMessageBotError, SmsApiError, TmapApiError } from "../../../../core";
import { DuplicatedDataError } from "../../../../database";
import { HttpErrorResponse } from "../../../../util/http-response";

const date = new Date(2000, 1, 1);

const errorMessageBot = mock<ErrorMessageBot>();

const errorMessageBotErrorHandlerLogger = mock<ErrorLogger>();
const errorMessageBotErrorHandler = new ErrorMessageBotErrorHandler(errorMessageBotErrorHandlerLogger);

const smsApiErrorHandlerLogger = mock<ErrorLogger>();
const smsApiErrorHandler = new SmsApiErrorHandler({ logger: smsApiErrorHandlerLogger, errorMessageBot });

const tmapApiErrorHandlerLogger = mock<ErrorLogger>();
const tmapApiErrorHandler = new TmapApiErrorHandler({ logger: tmapApiErrorHandlerLogger, errorMessageBot });

const controller = new ExternalApiErrorController({
  errorMessageBotErrorHandler,
  smsApiErrorHandler,
  tmapApiErrorHandler,
});

let res: Partial<Response>;

beforeEach(() => {
  mockClear(errorMessageBot);
  mockClear(errorMessageBotErrorHandlerLogger);
  mockClear(smsApiErrorHandlerLogger);
  mockClear(tmapApiErrorHandlerLogger);
  res = { send: jest.fn() };
});

describe("ExternalApiErrorController", () => {
  describe("handle()", () => {
    test("통과하는 테스트, ErrorMessageBotError", async () => {
      const error = new ErrorMessageBotError("오류");

      await controller.handle({ error, res: res as Response, date });

      expect(errorMessageBotErrorHandlerLogger.log).toHaveBeenCalled();
      expect(tmapApiErrorHandlerLogger.log).not.toHaveBeenCalled();
      expect(smsApiErrorHandlerLogger.log).not.toHaveBeenCalled();

      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(502));
    });

    test("통과하는 테스트, TmapApiError", async () => {
      const error = new TmapApiError("오류");

      await controller.handle({ error, res: res as Response, date });

      expect(errorMessageBotErrorHandlerLogger.log).not.toHaveBeenCalled();
      expect(tmapApiErrorHandlerLogger.log).toHaveBeenCalled();
      expect(smsApiErrorHandlerLogger.log).not.toHaveBeenCalled();

      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(502));
    });

    test("통과하는 테스트, SmsApiError", async () => {
      const error = new SmsApiError("오류");

      await controller.handle({ error, res: res as Response, date });

      expect(errorMessageBotErrorHandlerLogger.log).not.toHaveBeenCalled();
      expect(tmapApiErrorHandlerLogger.log).not.toHaveBeenCalled();
      expect(smsApiErrorHandlerLogger.log).toHaveBeenCalled();

      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(502));
    });

    test("실패하는 테스트, 담당이 아닌 에러", async () => {
      const error = new DuplicatedDataError("오류");

      await controller.handle({ error, res: res as Response, date });

      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
