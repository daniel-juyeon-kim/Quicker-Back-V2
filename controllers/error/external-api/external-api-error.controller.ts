import { Response } from "express";
import { ExternalApiError } from "../../../core";
import { HttpErrorResponse } from "../../../util/http-response";
import { SubErrorController } from "../sub-error.controller";
import { ErrorTypes } from "../types/error-types";
import { ErrorMessageBotErrorHandler, SmsApiErrorHandler, TmapApiErrorHandler } from "./handler";

export class ExternalApiErrorController implements SubErrorController {
  private readonly errorMessageBotErrorHandler: ErrorMessageBotErrorHandler;
  private readonly smsApiErrorHandler: SmsApiErrorHandler;
  private readonly tmapApiErrorHandler: TmapApiErrorHandler;

  constructor({
    errorMessageBotErrorHandler,
    smsApiErrorHandler,
    tmapApiErrorHandler,
  }: {
    errorMessageBotErrorHandler: ErrorMessageBotErrorHandler;
    smsApiErrorHandler: SmsApiErrorHandler;
    tmapApiErrorHandler: TmapApiErrorHandler;
  }) {
    this.errorMessageBotErrorHandler = errorMessageBotErrorHandler;
    this.smsApiErrorHandler = smsApiErrorHandler;
    this.tmapApiErrorHandler = tmapApiErrorHandler;
  }

  async handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof ExternalApiError) {
      this.errorMessageBotErrorHandler.handle({ error, date });
      await this.smsApiErrorHandler.handle({ error, date });
      await this.tmapApiErrorHandler.handle({ error, date });
      res.send(new HttpErrorResponse(502));
    }
  }
}
