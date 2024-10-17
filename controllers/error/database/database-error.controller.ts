import { Response } from "express";
import { DataBaseError, DuplicatedDataError, NotExistDataError, UnknownDataBaseError } from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";
import { AbstractSubErrorController } from "../abstract-sub-error.controller";
import { ErrorTypes } from "../types/error-types";

export type DataBaseLayerError = UnknownDataBaseError<unknown> | NotExistDataError | DuplicatedDataError;

export class DataBaseErrorController extends AbstractSubErrorController {
  handle = async ({ error, res, date }: { error: DataBaseError; res: Response; date: Date }) => {
    // 데이터 중복
    this.handleDuplicateDataError({ error, res });

    // 존재하지 않는 데이터
    this.handleNotExistDataError({ error, res });
  };
  private handleDuplicateDataError = ({ error, res }: { error: ErrorTypes; res: Response }) => {
    if (error instanceof DuplicatedDataError) {
      res.send(new HttpErrorResponse(409, error.message));
    }
  };
  private handleNotExistDataError = ({ error, res }: { error: DataBaseLayerError; res: Response }) => {
    if (error instanceof NotExistDataError) {
      res.send(new HttpErrorResponse(404));
    }
  };
}
