import { FieldValidationError, Result } from "express-validator";

const HTTPStatuses = {
  200: "OK",
}

type Codes = keyof typeof HTTPStatuses

export class HTTPResponse{
  private code: Codes;
  private message: string;
  private body?: any;

  constructor(code: Codes, body?: any) {
    this.code = code;
    this.message = HTTPStatuses[code];
    this.body = body
  }
}

const HTTPErrorStatuses = {
  400: "BadRequest",
  401: "Unauthorized",
  403: "Forbidden",
  404: "NotFound",
 
  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
}

type ErrorCodes = keyof typeof HTTPErrorStatuses
type ErrorTypes = string | Result<FieldValidationError> | undefined
export class HTTPErrorResponse {
  private code: ErrorCodes;
  private message: string;
  private error: ErrorTypes

  constructor(code: ErrorCodes, error?: ErrorTypes) {
    this.code = code;
    this.message = HTTPErrorStatuses[code];
    this.error = error
  }
}
