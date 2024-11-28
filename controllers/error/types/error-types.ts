import { ExternalApiError, UnknownError } from "../../../core";
import { DataBaseError } from "../../../database";

export type ErrorTypes = DataBaseError | ExternalApiError | UnknownError;
