import { Request, Response } from "express";

import { ErrorFileLogger, ErrorMessageBot } from "../../core";
import { ErrorMessage } from "../../core/slack/error-message";
import { DataBaseError, UnknownDataBaseError } from "../../database";
import { HttpErrorResponse } from "../../util/http-response";
import { ValidationError } from "../../validator";
import { ErrorController } from "./types/error-controller";
import { ErrorTypes } from "./types/error-types";

export class ErrorControllerImpl implements ErrorController {
  private readonly messageBot;
  private readonly logger;

  constructor({ messageBot, logger }: { messageBot: ErrorMessageBot; logger: ErrorFileLogger }) {
    this.messageBot = messageBot;
    this.logger = logger;
  }

  async handleError(error: ErrorTypes, _: Request, res: Response) {
    const date = new Date();

    // 1. 유효성검사 express-validator 에러 확인, 유효성 검사에 실패한 요청
    this.handleExpressValidationError({ error, res });

    // 2. 데이터 베이스 계층 에러
    this.handleDataBaseError({ error, res, date });

    // 3. 기타 에러 (예상 못한 에러)
    await this.handleOtherError({ error, res, date });
  }

  private handleExpressValidationError({ error, res }: { error: ErrorTypes; res: Response }) {
    if (this.isExpressValidationError(error)) {
      return res.send(new HttpErrorResponse(400, error.expressValidationError));
    }
  }

  private isExpressValidationError(error: ErrorTypes): error is ValidationError {
    return error instanceof ValidationError;
  }

  private async handleDataBaseError({
    error,
    res,
    date,
  }: {
    error: DataBaseError | unknown;
    res: Response;
    date: Date;
  }) {
    if (this.isDataBaseError(error)) {
      // 알 수 없는 DB 에러
      if (this.isUnknownDataBaseError(error)) {
        const unknownError = error.unknownError;

        await this.sendSlackMessage({ error: unknownError, date });
        this.logger.log({ error: unknownError, date });
        return res.send(new HttpErrorResponse(500));
      }

      // DB 유효성 검사 실패, ex 데이터 중복, 존재하지 않는 데이터
      return res.send(new HttpErrorResponse(404, error));
    }
  }

  private isUnknownDataBaseError(error: DataBaseError): error is UnknownDataBaseError<unknown> {
    return error instanceof UnknownDataBaseError;
  }

  private isDataBaseError(error: DataBaseError | unknown): error is DataBaseError {
    return error instanceof DataBaseError;
  }

  private async handleOtherError({ error, res, date }: { error: unknown; res: Response; date: Date }) {
    if (!this.isDataBaseError(error) && !this.isExpressValidationError(error)) {
      await this.sendSlackMessage({ error, date });
      this.logger.log({ error, date });

      res.send(new HttpErrorResponse(500));
    }
  }

  private async sendSlackMessage({ error, date }: { error: ErrorTypes; date: Date }) {
    try {
      const errorMessage = new ErrorMessage({ date, error });

      await this.messageBot.sendMessage(errorMessage);
    } catch (error) {
      this.logger.log({ error, date });
    }
  }
}
