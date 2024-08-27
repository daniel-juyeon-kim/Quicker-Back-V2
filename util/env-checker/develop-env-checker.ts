import { ExcludeEmptyString } from "..";
import { Env } from "../env/types";
import { AbstractEnvChecker } from "./abstract-env-checker";

export class DevelopEnvChecker extends AbstractEnvChecker {
  protected showInvalidEnv(key: string, value: Env): asserts value is ExcludeEmptyString {
    try {
      this.validateEnv(key, value);
    } catch (e) {
      const error = e as Error;
      console.error(error.message);
    }
  }
}
