import { ExternalApiError, TmapApiError } from "../../../../../core";
import { CommonExternalApiErrorHandler } from "../common-external-api-error.handler";

export class TmapApiErrorHandler extends CommonExternalApiErrorHandler {
  async handle({ error, date }: { error: ExternalApiError; date: Date }) {
    if (error instanceof TmapApiError) {
      await this.sendErrorMessageBySlack({ error, date });
      this.logger.log({ error, date });
    }
  }
}
