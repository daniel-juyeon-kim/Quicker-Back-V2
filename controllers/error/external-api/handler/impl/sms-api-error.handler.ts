import { ExternalApiError, SmsApiError } from "../../../../../core";
import { CommonExternalApiErrorHandler } from "../common-external-api-error.handler";

export class SmsApiErrorHandler extends CommonExternalApiErrorHandler {
  async handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof SmsApiError) {
      await this.sendErrorMessageBySlack({ error, date });
      this.logger.log({ error, date });
    }
  }
}
