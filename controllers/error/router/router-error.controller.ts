import { Response } from "express";
import { HttpErrorResponse } from "../../../util/http-response";
import { RouterError } from "../../util/router-error";
import { UrlNotExistError } from "../../util/url-not-exist-error";
import { AbstractSubErrorController } from "../abstract-sub-error.controller";

export class RouterErrorController extends AbstractSubErrorController {
  handle = ({ error, res, date }: { error: RouterError; res: Response; date: Date }) => {
    if (this.isUrlNotExistError(error)) {
      res.send(new HttpErrorResponse(404));
    }
  };
  private isUrlNotExistError = (error: RouterError): error is UrlNotExistError => {
    return error instanceof UrlNotExistError;
  };
}
