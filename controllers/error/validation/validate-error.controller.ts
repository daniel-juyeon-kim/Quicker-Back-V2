import { Response } from "express";
import { HttpErrorResponse } from "../../../util/http-response";
import { ValidationLayerError } from "../../../validator";
import { AbstractSubErrorController } from "../abstract-sub-error.controller";

export class ValidateErrorController extends AbstractSubErrorController {
  handle = ({ error, res, date }: { error: ValidationLayerError; res: Response; date: Date }) => {
    res.send(new HttpErrorResponse(400, error.error));
  };
}
