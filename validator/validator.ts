import { Request, RequestHandler } from "express";
import { checkSchema, Location, Result, Schema, ValidationError, validationResult } from "express-validator";

export const validate = (schema: Schema, location: Location[]): RequestHandler => {
  return async (req, _, next) => {
    const validateResult = await generateResult(schema, location, req);

    if (isPass(validateResult)) {
      return next();
    }

    const error = validateResult.array({ onlyFirstError: true })[0];
    next(error);
  };
};

const generateResult = async (schema: Schema, location: Location[], req: Request) => {
  await checkSchema(schema, location).run(req);
  const result = validationResult(req);

  return result;
};

const isPass = (validateResult: Result<ValidationError>) => {
  return validateResult.isEmpty();
};
