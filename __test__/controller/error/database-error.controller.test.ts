import { Response } from "express";
import { mock, mockClear } from "jest-mock-extended";
import { DataBaseErrorController } from "../../../controllers/error/database/database-error.controller";
import { UnknownErrorController } from "../../../controllers/error/unknwon/unknown-error.controller";
import { DuplicatedDataError, NotExistDataError } from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";

const fakeDate = new Date(2000, 0, 1);
jest.spyOn(global, "Date").mockImplementation(() => fakeDate);

let res: Partial<Response>;
const unknownErrorController = mock<UnknownErrorController>();
const controller = new DataBaseErrorController(unknownErrorController);

beforeEach(() => {
  mockClear(unknownErrorController);
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

    expect(res.send).toHaveBeenCalledWith(new HttpErrorResponse(404));
  });
});
