import { NextFunction, Request, Response } from "express";
import { checkSchema, Location, Result, Schema, ValidationError, validationResult } from "express-validator";
import { HttpErrorResponse } from "../util/http-response";

export const validate = (schema: Schema, location: Location[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 스키마로 요청 검증
    const validateResult = await generateResult(schema, location, req);

    // 요청값에 검증에러가 없으면 다음 미들웨어로
    if (isPass(validateResult)) {
      return next();
    }

    // 바로 처리함
    const error = validateResult.array();
    res.send(new HttpErrorResponse(400, error));
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
