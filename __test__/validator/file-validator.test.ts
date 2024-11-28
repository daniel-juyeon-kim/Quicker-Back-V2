import type { NextFunction, Request, Response } from "express";
import { HttpErrorResponse } from "../../util/http-response";
import { FileValidationError } from "../../validator/file-validator/file-validation.error";
import { validateSingleImageFile } from "../../validator/file-validator/file-validator";

let req: Partial<Request>;
let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  req = {};
  res = { send: jest.fn() };
  next = jest.fn();
});

describe("validateSingleImageFile", () => {
  test("통과하는 테스트", () => {
    const file = {
      originalname: "adfad.jpg",
    };
    req = { file } as Request;

    validateSingleImageFile(req as Request, res as Response, next as NextFunction);

    expect(next).toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  test("실패하는 테스트, 지원하지 않는 확장자", () => {
    const file = {
      originalname: "adfad.gif",
    };
    req = { file } as Request;

    validateSingleImageFile(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(
      new HttpErrorResponse(400, new FileValidationError("허용하지 않는 확장자 입니다.")),
    );
  });

  test("통과하는 테스트, 파일이 존재하지 않음", () => {
    req = {} as Request;

    validateSingleImageFile(req as Request, res as Response, next as NextFunction);

    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith(
      new HttpErrorResponse(400, new FileValidationError("이미지 파일이 존재하지 않습니다.")),
    );
  });
});
