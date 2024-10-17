import { Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import { ErrorControllerImpl } from "../../controllers";
import { DataBaseErrorController } from "../../controllers/error/database/database-error.controller";
import { RouterErrorController } from "../../controllers/error/router/router-error.controller";
import { UnknownErrorController } from "../../controllers/error/unknown/unknown-error.controller";
import { ValidateErrorController } from "../../controllers/error/validation/validae-error.controller";
import { UrlNotExistError } from "../../controllers/util/url-not-exist-error";
import { DuplicatedDataError } from "../../database";
import { ValidationLayerError } from "../../validator";

const routerErrorController = mock<RouterErrorController>();
const validateErrorController = mock<ValidateErrorController>();
const databaseErrorController = mock<DataBaseErrorController>();
const unknownErrorController = mock<UnknownErrorController>();

const controller = new ErrorControllerImpl({
  databaseErrorController,
  unknownErrorController,
  routerErrorController,
  validateErrorController,
});

let req = {};
let res: Partial<Response>;
const next = jest.fn();

beforeEach(() => {
  mockClear(databaseErrorController);
  mockClear(unknownErrorController);
  mockClear(routerErrorController);
  mockClear(validateErrorController);

  req = {};
  res = { send: jest.fn() };
  next.mockClear();
});

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

describe("ErrorControllerImpl 테스트", () => {
  test("라우터 에러 처리 테스트", async () => {
    const error = new UrlNotExistError("존재하지 않는 URL입니다.");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(routerErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validateErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
    expect(unknownErrorController.handle).not.toHaveBeenCalled();
  });

  test("유효성 검증 에러 처리 테스트", async () => {
    const error = new ValidationLayerError(mock());

    await controller.handleError(error, req as Request, res as Response, next);

    expect(validateErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
    expect(unknownErrorController.handle).not.toHaveBeenCalled();
  });

  test("데이터베이스 에러 처리 테스트", async () => {
    const error = new DuplicatedDataError("중복된 데이터입니다.");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(databaseErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validateErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(unknownErrorController.handle).not.toHaveBeenCalled();
  });

  test("알 수 없는 에러 처리 테스트", async () => {
    const error = new Error("알 수 없는 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(unknownErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validateErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
  });

  test("알 수 없는 에러 발생", async () => {
    const error = new Error("예상은 되지만 알 수 없는 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(unknownErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validateErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
  });

  test("예상 못한 에러 발생", async () => {
    const error = new Error("예측 불가한 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(unknownErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validateErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
  });
});
