import { Response } from "express";
import { ErrorLogger, UnknownError } from "../../../core";
import { ErrorMessage, ErrorMessageBot } from "../../../core/external-api/slack";
import { HttpErrorResponse } from "../../../util/http-response";

import { SubErrorController } from "../sub-error.controller";
import { ErrorTypes } from "../types/error-types";

export class UnknownErrorController implements SubErrorController {
  private readonly messageBot;
  private readonly logger;

  constructor({ messageBot, logger }: { messageBot: ErrorMessageBot; logger: ErrorLogger }) {
    this.messageBot = messageBot;
    this.logger = logger;
  }

  async handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof UnknownError) {
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
