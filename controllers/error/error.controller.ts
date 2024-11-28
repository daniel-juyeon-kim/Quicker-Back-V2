import { NextFunction, Request, Response } from "express";

import { DataBaseErrorController } from "./database/database-error.controller";
import { ExternalApiErrorController } from "./external-api/external-api-error.controller";
import { ErrorController } from "./types/error-controller";
import { ErrorTypes } from "./types/error-types";
import { UnknownErrorController } from "./unknown/unknown-error.controller";

export class ErrorControllerImpl implements ErrorController {
  private readonly databaseErrorController;
  private readonly unknownErrorController;
  private readonly externalApiErrorController;

  constructor({
    databaseErrorController,
    unknownErrorController,
    externalApiErrorController,
  }: {
    databaseErrorController: DataBaseErrorController;
    unknownErrorController: UnknownErrorController;
    externalApiErrorController: ExternalApiErrorController;
  }) {
    this.databaseErrorController = databaseErrorController;
    this.unknownErrorController = unknownErrorController;
    this.externalApiErrorController = externalApiErrorController;
  }

  handleError = async (error: ErrorTypes, _: Request, res: Response, next: NextFunction) => {
    const date = new Date();

    // 1. 데이터 베이스 계층 에러
    this.databaseErrorController.handle({ error, res, date });
    // 2. 외부 api 에러 확인
    await this.externalApiErrorController.handle({ error, res, date });
    // 3. 알 수 없는 에러
    await this.unknownErrorController.handle({ error, res, date });
  };
}
