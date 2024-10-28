import { Response } from "express";
import { mock, mockClear } from "jest-mock-extended";
import { UnknownErrorController } from "../../../controllers/error/unknown/unknown-error.controller";
import { ErrorLogger, ErrorMessage, ErrorMessageBot, UnknownDataBaseError } from "../../../core";
import { DataBaseError } from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

const messageBot = mock<ErrorMessageBot>();
const logger = mock<ErrorLogger>();

const controller = new UnknownErrorController({ messageBot, logger });

let res: Partial<Response>;

beforeEach(() => {
  mockClear(messageBot);
  mockClear(logger);
  res = { send: jest.fn() };
});

describe("UnknownErrorController 테스트", () => {
  test("에러 처리, 슬랙 메시지와 로깅이 동작후 response 500", async () => {
    const error = new UnknownDataBaseError("Unknown DB error");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    const errorMessage = messageBot.sendMessage.mock.calls[0][0];

    expect(errorMessage).toStrictEqual(new ErrorMessage({ error, date: fakeDate }));
    expect(logger.log).toHaveBeenCalledWith({ error, date: fakeDate });
    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(500));
  });

  test("슬랙 메시지 발송 실패시 파일로 로깅처리", async () => {
    const error = new UnknownDataBaseError("Unknown DB error");

    messageBot.sendMessage.mockRejectedValue(new Error("슬랙 메시지 전송 에러"));

    await controller.handle({ error, res: res as Response, date: fakeDate });

    const errorMessage = messageBot.sendMessage.mock.calls[0][0];

    expect(errorMessage).toStrictEqual(new ErrorMessage({ error, date: fakeDate }));
    expect(logger.log).toHaveBeenCalledTimes(2); // Slack error + original error
    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(500));
  });

  test("다른 에러 처리", async () => {
    const error = new DataBaseError("데이터가 존재하지 않습니다.");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    expect(res.send).not.toHaveBeenCalled();
  });
});
