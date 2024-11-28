import { ExternalApiError } from "../../../../core";

export interface ExternalApiErrorHandler {
  handle({ error, date }: { error: ExternalApiError; date: Date }): void | Promise<void>;
}
