import { Response } from "express";

import {
  BusinessRuleConflictDataError,
  DataBaseError,
  DuplicatedDataError,
  NotExistDataError,
} from "../../../database";
import { HttpErrorResponse } from "../../../util/http-response";
import { SubErrorController } from "../sub-error.controller";
import { ErrorTypes } from "../types/error-types";

export class DataBaseErrorController implements SubErrorController {
  handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }) {
    if (error instanceof DataBaseError) {
      this.handleDuplicateDataError({ error, res });
      this.handleNotExistDataError({ error, res });
      this.handleBusinessRuleConflictDataError({ error, res });
    }
  }

  private handleDuplicateDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof DuplicatedDataError) {
      res.send(new HttpErrorResponse(409, error.message));
    }
  }

  private handleNotExistDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof NotExistDataError) {
      res.send(new HttpErrorResponse(404, error.message));
    }
  }

  private handleBusinessRuleConflictDataError({ error, res }: { error: DataBaseError; res: Response }) {
    if (error instanceof BusinessRuleConflictDataError) {
      res.send(new HttpErrorResponse(422, error.message));
    }
  }
}
