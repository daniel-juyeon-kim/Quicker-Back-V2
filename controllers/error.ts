import { NextFunction, Request, Response } from "express";
import { slackBot } from "../service";
import { HTTPError } from "../types/http-error";

export class ErrorController {
  handler(err: HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err.status === 404) {
      res.send({ error_message: err.message });
      next();
    } else {
      console.error(err);
      slackBot.sendMessage(err);
      res.json({ errorMessage: err.message });
      next();
    }
  }
}