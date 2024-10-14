import { ErrorRequestHandler } from "express";
import { FieldValidationError, Result } from "express-validator";

import { errorMessageBot } from "../core";
import { ErrorMessage } from "../core/slack/error-message";
import { DataBaseError, DuplicatedDataError, NotExistDataError } from "../database";
import { HttpErrorResponse } from "../util/http-response";

export const errorController: ErrorRequestHandler = (error, _, res) => {
  // 데이터 베이스 계층 에러
  if (error instanceof DataBaseError) {
    if (isUserInputValidateError(error)) {
      return res.send(new HttpErrorResponse(404, error));
    }

    sendSlackMessage(error);
    return res.send(new HttpErrorResponse(500));
  }

  // 서비스 계층에서 생성된 에러 확인
  if (error instanceof HttpErrorResponse) {
    return res.send(error);
  }
  // express-validator 에러 확인, 유효성 검사에 실패한 요청
  else if (isExpressValidationError(error)) {
    return res.send(new HttpErrorResponse(400, error));
  }

  // 기타 에러 처리
  sendSlackMessage(error);
  res.send(new HttpErrorResponse(500, error.message));
};

const isExpressValidationError = (error: any | Result<FieldValidationError>) => {
  return error.type === "field" && error.path && error.location;
};

const sendSlackMessage = (error: any) => {
  try {
    const errorOccurDate = new Date();
    const errorMessage = new ErrorMessage(error, errorOccurDate);

    errorMessageBot.sendMessage(errorMessage);
  } catch (e) {
    console.log(e);
  }
};

const isUserInputValidateError = (error: DataBaseError) => {
  return error instanceof NotExistDataError || error instanceof DuplicatedDataError;
};
