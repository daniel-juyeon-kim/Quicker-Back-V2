import { DataBaseError } from "./database.error";

export class UnknownDataBaseError<T> extends DataBaseError {
  constructor(public readonly unknownError: T) {
    super();
  }
}
