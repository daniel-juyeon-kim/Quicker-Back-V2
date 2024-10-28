import { Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import {
  ErrorControllerImpl,
  ErrorMessageBotErrorHandler,
  SmsApiErrorHandler,
  TmapApiErrorHandler,
} from "../../../controllers";
import { DataBaseErrorController } from "../../../controllers/error/database/database-error.controller";
import { ExternalApiErrorController } from "../../../controllers/error/external-api/external-api-error.controller";
import { UnknownErrorController } from "../../../controllers/error/unknown/unknown-error.controller";
import { ErrorLogger, ErrorMessageBot, SmsApiError, UnknownDataBaseError } from "../../../core";
import { DuplicatedDataError } from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";

const logger = mock<ErrorLogger>();
const errorMessageBot = mock<ErrorMessageBot>();

const databaseErrorController = new DataBaseErrorController();
const unknownErrorController = new UnknownErrorController({ messageBot: errorMessageBot, logger });

const errorMessageBotErrorHandler = mock<ErrorMessageBotErrorHandler>();
const smsApiErrorHandler = mock<SmsApiErrorHandler>();
const tmapApiErrorHandler = mock<TmapApiErrorHandler>();

const externalApiErrorController = new ExternalApiErrorController({
  errorMessageBotErrorHandler,
  smsApiErrorHandler,
  tmapApiErrorHandler,
});

const controller = new ErrorControllerImpl({
  externalApiErrorController,
  databaseErrorController,
  unknownErrorController,
});

let req = {};
let res: Partial<Response>;
let next = jest.fn();

beforeEach(() => {
  mockClear(logger);
  mockClear(errorMessageBot);
  mockClear(errorMessageBotErrorHandler);
  mockClear(smsApiErrorHandler);
  mockClear(tmapApiErrorHandler);

  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("ErrorControllerImpl 테스트", () => {
  test("데이터베이스 에러 처리 테스트", async () => {
    const error = new DuplicatedDataError("중복된 데이터입니다.");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(409, error.message));
  });

  test("외부 api 에러 처리 테스트", async () => {
    const error = new SmsApiError("sms api 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(502));
  });

  test("알 수 없는 에러 발생", async () => {
    const error = new UnknownDataBaseError("예상은 되지만 알 수 없는 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(500));
  });
});
