import { ErrorRequestHandler } from "express";
import { FieldValidationError, Result } from "express-validator";

import { slackBot } from "../service";
import { HTTPErrorResponse } from "../service/http-response";
import { ErrorMessage } from "../service/slack/error-message";

export const errorController: ErrorRequestHandler = (error, _, res, __) => {
  // 서비스 계층에서 생성된 에러 확인
  if (error instanceof HTTPErrorResponse) {
    return res.send(error);
  }
  // express-validator 에러 확인, 유효성 검사에 실패한 요청
  else if (isExpressValidationError(error)) {
    return res.send(new HTTPErrorResponse(400, error));
  }

  // 기타 에러 처리
  sendSlackMessage(error);
  res.send(new HTTPErrorResponse(500, error.message));
};

const isExpressValidationError = (error: any | Result<FieldValidationError>) => {
  return error.type === "field" && error.path && error.location;
};

const sendSlackMessage = (error: any) => {
  try {
    const errorOccurDate = new Date();
    const errorMessage = new ErrorMessage(error, errorOccurDate);

    slackBot.sendMessage(errorMessage);
  } catch (e) {
    console.log(e);
  }
};
