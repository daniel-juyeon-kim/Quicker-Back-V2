import { Request, RequestHandler } from "express";
import { checkSchema, Location, Result, Schema, ValidationError, validationResult } from "express-validator";

export class RequestValidator {
  public static validate(schema: Schema, location: Location[]): RequestHandler {
    return async (req, _, next) => {
      const validateResult = await RequestValidator.generateResult(schema, location, req);

      if (RequestValidator.isPass(validateResult)) {
        return next();
      }

      const error = validateResult.array({ onlyFirstError: true })[0];
      next(error);
    };
  }

  private static async generateResult(schema: Schema, location: Location[], req: Request) {
    await checkSchema(schema, location).run(req);
    const result = validationResult(req);

    return result;
  }

  private static isPass(validateResult: Result<ValidationError>) {
    return validateResult.isEmpty();
  }
}
