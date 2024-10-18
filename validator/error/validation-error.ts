import { ValidationError } from "express-validator";

export class ValidationLayerError {
  constructor(public error: ValidationError[]) {}
}
