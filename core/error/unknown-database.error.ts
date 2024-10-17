import { UnknownError } from "./unknown.error";

export class UnknownDataBaseError extends UnknownError {
  constructor(public readonly unknownError: unknown) {
    super();
  }
}
