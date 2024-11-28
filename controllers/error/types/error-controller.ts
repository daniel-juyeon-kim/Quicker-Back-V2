import { ErrorRequestHandler } from "express";

export interface ErrorController {
  handleError: ErrorRequestHandler;
}
