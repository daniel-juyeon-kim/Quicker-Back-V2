import { FieldValidationError, Result } from "express-validator";

const status = {
  400: "BadRequest",
  401: "Unauthorized",
  403: "Forbidden",
  404: "NotFound",
  409: "Conflict",

  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
} as const;

type Code = keyof typeof status;

type Message = (typeof status)[Code];

type ErrorTypes<T> = Result<FieldValidationError> | Error | string | T;

export class HttpErrorResponse<T> {
  private message: Message;

  constructor(
    private code: Code,
    private error?: ErrorTypes<T>,
  ) {
    this.message = status[code];
  }
}
