import { Request, Response } from "express";
import { ValidationError as ExpressValidationError } from "express-validator";
import { mock, mockClear } from "jest-mock-extended";

import { ErrorControllerImpl } from "../../controllers/error/error.controller";
import { ErrorFileLogger, ErrorMessage, ErrorMessageBot } from "../../core";
import { DuplicatedDataError, NotExistDataError, UnknownDataBaseError } from "../../database";
import { HttpErrorResponse } from "../../util/http-response";
import { ValidationError } from "../../validator";

const messageBot = mock<ErrorMessageBot>();
const logger = mock<ErrorFileLogger>();

const controller = new ErrorControllerImpl({ logger, messageBot });

let _ = {};
let res: Partial<Response>;

beforeEach(() => {
  mockClear(messageBot);
  mockClear(logger);

  _ = {};
  res = { send: jest.fn() };
});

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

describe("ErrorController 테스트", () => {
  beforeEach(() => {});

  describe("유효성 검증 계층 에러 처리테스트", () => {
    test("ValidationError 처리 테스트", async () => {
      const error = new ValidationError(mock<ExpressValidationError>());

      await controller.handleError(error, _ as Request, res as Response);

      expect(messageBot.sendMessage).not.toHaveBeenCalled();
      expect(logger.log).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(400, error.expressValidationError));
    });
  });

  describe("데이터 베이스 계층 에러 처리 테스트", () => {
    test("isUnknownDataBaseError 처리 테스트", async () => {
      const unknownError = new Error();
      const error = new UnknownDataBaseError(unknownError);

      await controller.handleError(error, _ as Request, res as Response);

      expect(messageBot.sendMessage).toHaveBeenCalledWith(new ErrorMessage({ date: fakeDate, error: unknownError }));
      expect(logger.log).toHaveBeenCalledWith({ error: unknownError, date: fakeDate });
      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(500));
    });

    test("DuplicatedDataError 처리 테스트", async () => {
      const error = new DuplicatedDataError("중복된 데이터");

      await controller.handleError(error, _ as Request, res as Response);

      expect(messageBot.sendMessage).not.toHaveBeenCalled();
      expect(logger.log).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(404, error));
    });

    test("NotExistDataError 처리 테스트", async () => {
      const error = new NotExistDataError("중복된 데이터");

      await controller.handleError(error, _ as Request, res as Response);

      expect(messageBot.sendMessage).not.toHaveBeenCalled();
      expect(logger.log).not.toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(404, error));
    });
  });

  describe("기타 에러 처리 테스트", () => {
    test("NotExistDataError 처리 테스트", async () => {
      const error = { message: "예측 불가능한 에러" };

      await controller.handleError(error, _ as Request, res as Response);

      expect(messageBot.sendMessage).toHaveBeenCalledWith(new ErrorMessage({ date: fakeDate, error }));
      expect(logger.log).toHaveBeenCalledWith({ error, date: fakeDate });
      expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(500));
    });
  });
});
