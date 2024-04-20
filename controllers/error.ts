import { ErrorRequestHandler } from "express";
import { HTTPErrorResponse } from "../service/http-response";
import { slackBot } from "../service";
import { FieldValidationError, Result } from "express-validator";

export const errorController: ErrorRequestHandler = (err, _, res, __) => { 
    if (err instanceof HTTPErrorResponse) { // 서비스 계층에서 생성된 에러 확인
      return res.send(err);
    }
    else if (isExpressValidationError(err)) { // express-validator 에러 확인, 유효성 검사에 실패한 요청
      return res.send(new HTTPErrorResponse(400, err)); 
    }
    // 기타 에러 처리
    slackBot.sendMessage(err);
    console.log(err);
    res.send(new HTTPErrorResponse(500, err.message));  
};

const isExpressValidationError = (err: any | Result<FieldValidationError>) => {
  return err.type === 'field' && err.path && err.location
}
