import { Response } from "express";
import { ErrorTypes } from "./types/error-types";

export interface SubErrorController {
  handle({ error, res, date }: { error: ErrorTypes; res: Response; date: Date }): void | Promise<void>;
}
