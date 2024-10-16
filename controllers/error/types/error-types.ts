import { DataBaseError } from "../../../database";
import { ValidationError } from "../../../validator";

export type ErrorTypes = DataBaseError | ValidationError | unknown;
