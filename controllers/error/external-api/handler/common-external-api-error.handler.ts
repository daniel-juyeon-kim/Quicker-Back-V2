import { ErrorLogger, ErrorMessage, ErrorMessageBot, ExternalApiError } from "../../../../core";
import { AbstractExternalApiErrorHandler } from "./abstract-external-api.handler";

export abstract class CommonExternalApiErrorHandler extends AbstractExternalApiErrorHandler {
  protected readonly errorMessageBot: ErrorMessageBot;

  constructor({ logger, errorMessageBot }: { logger: ErrorLogger; errorMessageBot: ErrorMessageBot }) {
    super(logger);
    this.errorMessageBot = errorMessageBot;
  }

  protected async sendErrorMessageBySlack({ error, date }: { error: ExternalApiError; date: Date }) {
    const errorMessage = new ErrorMessage({ date, error });
    await this.errorMessageBot.sendMessage(errorMessage);
  }
}
