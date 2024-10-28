import { ErrorLogger, ExternalApiError } from "../../../../core";
import { ExternalApiErrorHandler } from "./external-api-error.handler";

export abstract class AbstractExternalApiErrorHandler implements ExternalApiErrorHandler {
  constructor(protected readonly logger: ErrorLogger) {}

  abstract handle({ error, date }: { error: ExternalApiError; date: Date }): void | Promise<void>;
}
