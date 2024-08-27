import { ExcludeEmptyString } from "..";
import { Env } from "../env/types";
import { AbstractEnvChecker } from "./abstract-env-checker";

export class ProductionEnvChecker extends AbstractEnvChecker {
  protected showInvalidEnv(key: string, value: Env): asserts value is ExcludeEmptyString {
    this.validateEnv(key, value);
  }
}
