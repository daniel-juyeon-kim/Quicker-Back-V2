import { Response } from "express";
import { DataBaseErrorController } from "../../../controllers/error/database/database-error.controller";
import { UnknownDataBaseError } from "../../../core";
import { BusinessRuleConflictDataError, DuplicatedDataError, NotExistDataError } from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

let res: Partial<Response>;

const controller = new DataBaseErrorController();

beforeEach(() => {
  res = { send: jest.fn() };
});

describe("DataBaseErrorController 테스트", () => {
  test("DuplicatedDataError 처리", async () => {
    const error = new DuplicatedDataError("중복된 데이터가 존재합니다.");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(409, error.message));
  });

  test("NotExistDataError 처리", async () => {
    const error = new NotExistDataError("데이터가 존재하지 않습니다.");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(404, error.message));
  });

  test("BusinessRuleConflictDataError 처리", async () => {
    const error = new BusinessRuleConflictDataError("비지니스 규칙에 어긋나는 요청");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(422, error.message));
  });

  test("UnknownDataBaseError 처리", async () => {
    const error = new UnknownDataBaseError("알 수 없는 데이터 베이스 에러");

    await controller.handle({ error, res: res as Response, date: fakeDate });

    expect(res.send).not.toHaveBeenCalled();
  });
});
