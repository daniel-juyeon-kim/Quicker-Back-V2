import { Response } from "express";
import { ErrorFileLogger, ErrorMessage, ErrorMessageBot } from "../../../core";
import { HttpErrorResponse } from "../../../util/http-response";
import { AbstractSubErrorController } from "../abstract-sub-error.controller";
import { ErrorTypes } from "../types/error-types";

export class UnknownErrorController extends AbstractSubErrorController {
  private readonly messageBot;
  private readonly logger;

  constructor({ messageBot, logger }: { messageBot: ErrorMessageBot; logger: ErrorFileLogger }) {
    super();
    this.messageBot = messageBot;
    this.logger = logger;
  }

  handle = async ({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) => {
    await this.sendSlackMessage({ error, date });
    this.logger.log({ error, date });

    res.send(new HttpErrorResponse(500));
  };
  private sendSlackMessage = async ({ error, date }: { error: ErrorTypes; date: Date }) => {
    try {
      const errorMessage = new ErrorMessage({ date, error });

      await this.messageBot.sendMessage(errorMessage);
    } catch (error) {
      this.logger.log({ error, date });
    }
  };
}
class UnknownError extends Error {}

class UnknwonDataBaseError extends UnknownError {}
