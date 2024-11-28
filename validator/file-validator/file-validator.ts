import path from "path";

import { RequestHandler } from "express";
import { isUndefined } from "../../util";
import { HttpErrorResponse } from "../../util/http-response";
import { FileValidationError } from "./file-validation.error";

const ERROR_MESSAGE_NOT_EXIST_FILE = "이미지 파일이 존재하지 않습니다.";
const ERROR_MESSAGE_NOT_ALLOW_EXT_NAME = "허용하지 않는 확장자 입니다.";

const ALLOW_EXT_NAMES = [".jpeg", ".jpg", ".png"];

export const validateSingleImageFile: RequestHandler = (req, res, next) => {
  if (isUndefined(req.file)) {
    return res.send(new HttpErrorResponse(400, new FileValidationError(ERROR_MESSAGE_NOT_EXIST_FILE)));
  }

  const fileExt = path.extname(req.file.originalname).toLowerCase();

  if (ALLOW_EXT_NAMES.includes(fileExt)) {
    return next();
  }

  res.send(new HttpErrorResponse(400, new FileValidationError(ERROR_MESSAGE_NOT_ALLOW_EXT_NAME)));
};
