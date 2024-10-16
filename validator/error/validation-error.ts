import { ValidationError as ExpressValidatorError } from "express-validator";

export class ValidationError extends Error {
  constructor(public expressValidationError: ExpressValidatorError) {
    super();
  }
}
