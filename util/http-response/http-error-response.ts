import { FieldValidationError, Result } from "express-validator";

const status = {
  400: "BadRequest",
  401: "Unauthorized",
  403: "Forbidden",
  404: "NotFound",

  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
} as const;

type Code = keyof typeof status;

type Message = (typeof status)[Code];

type ErrorTypes = Result<FieldValidationError> | Error | string | undefined;

export class HttpErrorResponse {
  private code: Code;
  private message: Message;
  private error: ErrorTypes;

  constructor(code: Code, error?: ErrorTypes) {
    this.code = code;
    this.message = status[code];
    this.error = error;
  }
}
