import { NextFunction, Request, Response } from "express";

import { UnknownError } from "../../core";
import { DataBaseError } from "../../database";
import { ValidationLayerError } from "../../validator";
import { RouterError } from "../util/router-error";
import { DataBaseErrorController, DataBaseLayerError } from "./database/database-error.controller";
import { RouterErrorController } from "./router/router-error.controller";
import { ErrorController } from "./types/error-controller";
import { ErrorTypes } from "./types/error-types";
import { UnknownErrorController } from "./unknown/unknown-error.controller";
import { ValidateErrorController } from "./validation/validate-error.controller";

export class ErrorControllerImpl implements ErrorController {
  private readonly databaseErrorController;
  private readonly unknownErrorController;
  private readonly routerErrorController;
  private readonly validatorErrorController;

  constructor({
    databaseErrorController,
    unknownErrorController,
    routerErrorController,
    validateErrorController: validatorErrorController,
  }: {
    databaseErrorController: DataBaseErrorController;
    unknownErrorController: UnknownErrorController;
    routerErrorController: RouterErrorController;
    validateErrorController: ValidateErrorController;
  }) {
    this.databaseErrorController = databaseErrorController;
    this.unknownErrorController = unknownErrorController;
    this.routerErrorController = routerErrorController;
    this.validatorErrorController = validatorErrorController;
  }

  handleError = async (error: ErrorTypes, _: Request, res: Response, next: NextFunction) => {
    const date = new Date();

    try {
      // 1. 라우터 계층 에러
      if (this.isRouterError(error)) {
        return this.routerErrorController.handle({ error, res, date });
      } else if (this.isValidationLayerError(error)) {
        // 2. 유효성검사 express-validator 에러 확인, 유효성 검사에 실패한 요청
        return this.validatorErrorController.handle({ error, res, date });
      } else if (this.isDataBaseError(error)) {
        // 3. 데이터 베이스 계층 에러
        return this.databaseErrorController.handle({ error, res, date });
      } else if (this.unknownError(error)) {
        // 4. 알 수 없는 에러, 예상은 가능한 에러
        return this.unknownErrorController.handle({ error, res, date });
      }
      // 5. 기타 에러 (예상 못한 에러)
      this.unknownErrorController.handle({ error, res, date });
    } catch (error) {
      this.unknownErrorController.handle({ error, res, date });
    }
  };
  protected isValidationLayerError = (error: ErrorTypes): error is ValidationLayerError => {
    return error instanceof ValidationLayerError;
  };
  protected isDataBaseError = (error: ErrorTypes): error is DataBaseLayerError => {
    return error instanceof DataBaseError;
  };
  protected isRouterError = (error: ErrorTypes): error is RouterError => {
    return error instanceof RouterError;
  };
  private unknownError = (error: ErrorTypes): error is UnknownError => {
    return error instanceof UnknownError;
  };
}
