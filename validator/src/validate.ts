import { Request, RequestHandler } from "express";
import { Location, Schema, checkSchema, validationResult } from "express-validator";

export const validate = (schema: Schema, location: Location[]): RequestHandler => {
  return async (req, _, next) => {
    const validateResult = await generateResult(schema, location, req);

    if (validateResult.isEmpty()) { // 유효성 검사 통과
      return next();
      
    }
    
    // 유효성 검사 실패
    next(validateResult.array({ onlyFirstError: true })[0]);  // 에러중 맨 처음 에러만 에러 헨들러로 이동
  };
}

const generateResult = async (schema: Schema, location: Location[], req:Request) => {
  await checkSchema(schema, location).run(req);
  return validationResult(req);
}

