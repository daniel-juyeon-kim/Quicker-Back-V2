import { Response } from "express";
import { ErrorTypes } from "./types/error-types";
import { SubErrorController } from "./types/sub-error.controller";

export abstract class AbstractSubErrorController implements SubErrorController {
  abstract handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }): void | Promise<void>;
}
