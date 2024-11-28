import { ErrorLogger, ErrorMessageBotError, ExternalApiError } from "../../../../../core";
import { AbstractExternalApiErrorHandler } from "../abstract-external-api.handler";

export class ErrorMessageBotErrorHandler extends AbstractExternalApiErrorHandler {
  constructor(logger: ErrorLogger) {
    super(logger);
  }

  handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof ErrorMessageBotError) {
      this.logger.log({ error, date });
    }
  }
}
