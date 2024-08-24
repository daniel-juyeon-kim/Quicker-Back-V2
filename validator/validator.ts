import { Request, RequestHandler } from "express";
import { checkSchema, Location, Result, Schema, ValidationError, validationResult } from "express-validator";

export const validate = (schema: Schema, location: Location[]): RequestHandler => {
  return async (req, _, next) => {
    // 스키마로 요청 검증
    const validateResult = await generateResult(schema, location, req);

    // 요청값에 검증에러가 없으면 다음 미들웨어로
    if (isPass(validateResult)) {
      return next();
    }

    // 요청값에 검증에러가 있으면 에러를 에러를 처리하는 미들웨어로
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
