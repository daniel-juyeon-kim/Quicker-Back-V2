import { Request, Response } from "express";
import { mock, mockClear } from "jest-mock-extended";

import { ErrorControllerImpl } from "../../controllers";
import { DataBaseErrorController } from "../../controllers/error/database/database-error.controller";
import { RouterErrorController } from "../../controllers/error/router/router-error.controller";
import { UnknownErrorController } from "../../controllers/error/unknwon/unknown-error.controller";
import { ValidateErrorController } from "../../controllers/error/validation/validae-error.controller";
import { UrlNotExistError } from "../../controllers/util/url-not-exist-error";
import { DuplicatedDataError } from "../../database";
import { ValidationLayerError } from "../../validator";

const routerErrorController = mock<RouterErrorController>();
const validatorErrorController = mock<ValidateErrorController>();
const databaseErrorController = mock<DataBaseErrorController>();
const unknownErrorController = mock<UnknownErrorController>();

const controller = new ErrorControllerImpl({
  databaseErrorController,
  unknownErrorController,
  routerErrorController,
  validateErrorController: validatorErrorController,
});

let req = {};
let res: Partial<Response>;
const next = jest.fn();

beforeEach(() => {
  mockClear(databaseErrorController);
  mockClear(unknownErrorController);
  mockClear(routerErrorController);
  mockClear(validatorErrorController);

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
    expect(validatorErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
    expect(unknownErrorController.handle).not.toHaveBeenCalled();
  });

  test("유효성 검증 에러 처리 테스트", async () => {
    const error = new ValidationLayerError(mock());

    await controller.handleError(error, req as Request, res as Response, next);

    expect(validatorErrorController.handle).toHaveBeenCalledWith({
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
    expect(validatorErrorController.handle).not.toHaveBeenCalled();
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
    expect(validatorErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
  });

  test("알 수 없는 에러 발생", async () => {
    const error = new Error("첫 번째 에러");

    await controller.handleError(error, req as Request, res as Response, next);

    expect(unknownErrorController.handle).toHaveBeenCalledWith({
      error,
      res: res as Response,
      date: fakeDate,
    });
    expect(validatorErrorController.handle).not.toHaveBeenCalled();
    expect(routerErrorController.handle).not.toHaveBeenCalled();
    expect(databaseErrorController.handle).not.toHaveBeenCalled();
  });
});
